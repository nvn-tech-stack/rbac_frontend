import { createContext, useContext, useState, type ReactNode } from "react";

import type { Module, Role, User, Permission } from "../../utils/interfaces";
import { useAuth } from "../auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  ResendEmail,
  updateUserById,
  userList,
  userTags,
} from "../../services/user";

import {
  createRole,
  getRoleById,
  roleLists,
  updateRole,
  updateStatusRole,
} from "../../services/role";
import { getModules } from "../../services/Module";
import { useToast } from "../Toast";

type UserManagementContextType = {
  users: User[];
  userId: string | null;
  mumtateCreateUser: any;
  isLoading: boolean;
  UserLimit: number;
  UserPage: number;
  RoleLimit: number;
  RolePage: number;
  handleChangeRowsPerPage: any;
  handleChangePage: any;
  totalsUserResults: number;
  setTabValue: any;
  tabValue: number;
  mumtateCreateRole: any;
  isModuleLoading: boolean;
  modules: Module[];
  roles: Role[];
  isRoleLoading: boolean;
  handleRoleChangePage: any;
  handleRoleChangeRowsPerPage: any;
  totalsRoleResults: number;
  mumtateUpdateRole: any;
  handleActiveAndInactive: any;
  mumtateUpdateUser: any;
  mumtateResendEmail: any;
  SetroleqFilter: any;
  SetuserqFilter: any;
  setRoleSearch: any;
  setUserSearch: any;
  modulePermissions: Permission[];
  roleInfo: Role;
  userTagsData: any[];
  isTagsLoading: boolean;
};

const UserManagementContext = createContext<UserManagementContextType | null>(
  null,
);

export const useUserManagementProvider = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [UserPage, setUserPage] = useState<number>(0);
  const [UserLimit, setUserLimit] = useState<number>(10);
  const [RoleLimit, setRoleLimit] = useState<number>(10);
  const [RolePage, setRolePage] = useState<number>(0);
  const [roleqFilter, SetroleqFilter] = useState({});
  const [userqFilter, SetuserqFilter] = useState({});
  const [roleSearch, setRoleSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  const showToast = useToast();

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: [
      "users",
      user?._id,
      UserPage,
      UserLimit,
      userqFilter,
      userSearch,
    ],
    queryFn: () =>
      userList({
        params: {
          limit: UserLimit,
          page: UserPage + 1,
          qFilter: JSON.stringify(userqFilter),
          search: userSearch,
        },
      }),
  });

  const { mutate: mumtateCreateUser } = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const { mutate: mumtateUpdateUser } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUserById(id, { data }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const { mutate: mumtateResendEmail } = useMutation({
    mutationFn: ({ data }: { data: any }) => ResendEmail({ data }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const userLists = users?.results?.users || [];
  const totalsUserResults = users?.results?.pagination.totalResults || 0;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setUserPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserLimit(parseInt(event.target.value));
    setUserPage(0);
  };
  const handleRoleChangePage = (_event: unknown, newPage: number) => {
    setRolePage(newPage);
  };
  const handleRoleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRoleLimit(parseInt(event.target.value));
    setRolePage(0);
  };

  // role

  const { data: roles = [], isLoading: isRoleLoading } = useQuery({
    queryKey: [
      "roles",
      user?._id,
      RolePage,
      RoleLimit,
      roleqFilter,
      roleSearch,
    ],
    queryFn: () =>
      roleLists({
        params: {
          limit: RoleLimit,
          page: RolePage + 1,
          type: "admin",
          qFilter: JSON.stringify(roleqFilter),
          search: roleSearch,
        },
      }),
  });

  const { mutate: mumtateCreateRole } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });

  const { mutate: mumtateUpdateRole } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateRole(id, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });

  const { mutate: mumtateUpdateStatusRole } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateStatusRole(id, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      showToast(message, "error");
    },
  });

  const handleActiveAndInactive = (id: string, status: string) => {
    mumtateUpdateStatusRole({ id, data: { status } });
  };

  const roleId = user?.role._id;

  const { data: role = {} } = useQuery({
    queryKey: ["roles", roleId],
    queryFn: () => {
      if (roleId) {
        return getRoleById(roleId);
      }
    },
  });

  let modulePermissions = [];
  if (role?.results?.permissions.length > 0) {
    modulePermissions = role?.results?.permissions;
  }

  const roleInfo = role?.results?.role;

  // module

  const { data: modules = [], isLoading: isModuleLoading } = useQuery({
    queryKey: ["roles", user?._id],
    queryFn: () => getModules({ params: { type: "admin" } }),
  });

  const { data: userTagsData = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ["tags", user?._id],
    queryFn: userTags,
  });

  const totalsRoleResults = roles?.results?.pagination.totalResults || 0;

  return {
    users: userLists,
    mumtateCreateUser,
    isLoading,
    handleChangeRowsPerPage,
    handleChangePage,
    UserLimit,
    UserPage,
    totalsUserResults,
    userId: user?._id ? user?._id : null,
    setTabValue,
    tabValue,
    mumtateCreateRole,
    isModuleLoading,
    isRoleLoading,
    modules: modules?.results,
    roles: roles?.results?.roles || [],
    handleRoleChangePage,
    handleRoleChangeRowsPerPage,
    RolePage,
    RoleLimit,
    totalsRoleResults,
    mumtateUpdateRole,
    handleActiveAndInactive,
    mumtateUpdateUser,
    mumtateResendEmail,
    SetroleqFilter,
    SetuserqFilter,
    setRoleSearch,
    setUserSearch,
    modulePermissions,
    roleInfo,
    userTagsData: userTagsData?.results?.tags || [],
    isTagsLoading,
  };
};

export const UserManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userManagement = useUserManagementProvider();
  return (
    <UserManagementContext.Provider value={userManagement}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = (): UserManagementContextType => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error(
      "useUserManagement must be used within an UserManagementProvider",
    );
  }
  return context;
};
