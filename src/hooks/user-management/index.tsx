import { createContext, useContext, useState, type ReactNode } from "react";

import type { User } from "../../utils/interfaces";
import { useAuth } from "../auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, userList } from "../../services/user";

type UserManagementContextType = {
  users: User[];
  mumtateCreateUser: any;
  isLoading: boolean;
  handleCreateUser: (data: any) => void;
  UserLimit: number;
  UserPage: number;
  handleChangeRowsPerPage: any;
  handleChangePage: any;
  totalsUserResults: number;
  setTabValue: any;
  tabValue: number;
};
const UserManagementContext = createContext<UserManagementContextType | null>(
  null,
);

export const useUserManagementProvider = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [UserPage, setUserPage] = useState<number>(0);
  const [UserLimit, setUserLimit] = useState<number>(10);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?._id, UserPage, UserLimit],
    queryFn: () =>
      userList({ params: { limit: UserLimit, page: UserPage + 1 } }),
    enabled: !!user?._id,
  });

  const { mutate: mumtateCreateUser } = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const handleCreateUser = (data: any) => {
    mumtateCreateUser({ data });
  };

  const userLists = users?.results?.users || [];
  const totalsUserResults = users?.results?.pagination.totalResults || 0;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setUserPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("parseInt(event.target.value)", parseInt(event.target.value));
    setUserLimit(parseInt(event.target.value));
    setUserPage(0);
  };

  return {
    users: userLists,
    mumtateCreateUser,
    isLoading,
    handleCreateUser,
    handleChangeRowsPerPage,
    handleChangePage,
    UserLimit,
    UserPage,
    totalsUserResults,
    userId: user?._id ? user?._id : null,
    setTabValue,
    tabValue,
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
