import {
  Box,
  Button,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserManagement } from "../../hooks/user-management";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../hooks/Toast";
import { useQuery } from "@tanstack/react-query";
import { getRoleById } from "../../services/role";
import { useEffect } from "react";

type FormValues = {
  roleName: string;
  permissions: {
    [id: string]: {
      _id?: string;
      view: boolean;
      edit: boolean;
      create: boolean;
      delete: boolean;
    };
  };
};

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
  height: "90vh",
});

const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .createRole": {
    marginLeft: "10px",
  },
  marginBottom: "30px",
});

const MidBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 10,
  height: 500,
  overflowY: "auto",
});

const BottomBox = styled(Box)({
  display: "flex",
  width: 300,
  justifyContent: "space-between",
  marginLeft: "19px",
});

const TextFieldStyled = styled(TextField)({
  width: 300,
  "& .MuiInputBase-root": {
    height: 40,
    fontSize: 15,
  },
});

const mapApiToForm = (permissions: any[]) => {
  const result: any = {};

  permissions.forEach((p) => {
    result[p.module_id] = {
      _id: p._id,
      view: p.is_view || false,
      edit: p.is_edit || false,
      create: p.is_create || false,
      delete: p.is_delete || false,
    };
  });

  return result;
};

export default function CreateRoleAndUpdate() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { roleId } = useParams();
  const {
    setTabValue,
    mumtateCreateRole,
    modules,
    isModuleLoading,
    mumtateUpdateRole,
    userId,
  } = useUserManagement();
  const isUpdate = Boolean(roleId);

  const { data: role = {} } = useQuery({
    queryKey: ["roles", roleId],
    queryFn: () => {
      if (roleId) {
        return getRoleById(roleId);
      }
    },
    enabled: !!roleId,
  });

  const {
    watch,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      roleName: "",
      permissions: {},
    },
  });

  const permissionsData = watch("permissions") || {};

  const handleOnCancelCreate = () => {
    setTabValue(1);
    navigate("/admin/user-management");
  };

  const actions = ["view", "edit", "create", "delete"];

  const handleRoleFormSubmit = (data: FormValues) => {
    const formattedData = {
      name: data.roleName,
      type: "admin",
      owner: userId,
      permissions: Object.entries(data.permissions).map(([moduleId, data]) => ({
        ...(data._id && { _id: data._id }),
        module_id: moduleId,
        is_view: data.view,
        is_edit: data.edit,
        is_create: data.create,
        is_delete: data.delete,
      })),
    };

    if (isUpdate) {
      mumtateUpdateRole(
        { data: formattedData, id: roleId },
        {
          onSuccess: () => {
            showToast("Role updated successfully", "success");
            reset();
            setTabValue(1);
            navigate("/admin/user-management");
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message || "Something went wrong!";
            showToast(message, "error");
          },
        },
      );
    } else {
      mumtateCreateRole(
        { data: formattedData },
        {
          onSuccess: () => {
            showToast("Role created successfully", "success");
            reset();
            setTabValue(1);
            navigate("/admin/user-management");
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message || "Something went wrong!";
            showToast(message, "error");
          },
        },
      );
    }
  };

  useEffect(() => {
    if (roleId && role?.results?.permissions) {
      reset({
        roleName: role?.results?.role?.name || "",
        permissions: mapApiToForm(role?.results?.permissions),
      });
    }
  }, [roleId, role, reset]);

  if (isModuleLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <BoxContainer>
        <TopBox>
          <RxCross2
            onClick={handleOnCancelCreate}
            style={{ fontSize: 25, cursor: "pointer" }}
          />
          <Typography className="createRole" variant="h6">
            {isUpdate ? "Edit Role" : "Create New Role"}
          </Typography>
        </TopBox>

        <form onSubmit={handleSubmit(handleRoleFormSubmit)}>
          <MidBox>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Role Name *</Typography>

              <Controller
                name="roleName"
                control={control}
                rules={{ required: "Role name is required" }}
                render={({ field, fieldState }) => (
                  <TextFieldStyled
                    {...field}
                    placeholder="Role Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ p: 1, mb: 1 }}>
              <Typography variant="h5">Module Access</Typography>
            </Box>

            <Box>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Name</TableCell>
                      {actions.map((a) => (
                        <TableCell key={a}>{a}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {modules.length > 0
                      ? modules.map((module) => {
                          const permissions = permissionsData[module._id] || {};

                          const isViewDisabled =
                            permissions.edit ||
                            permissions.create ||
                            permissions.delete;

                          return (
                            <TableRow key={module._id}>
                              <TableCell>{module.name}</TableCell>

                              {actions.map((action) => (
                                <TableCell key={action}>
                                  <Controller
                                    name={
                                      `permissions.${module._id}.${action}` as any
                                    }
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                      <Checkbox
                                        checked={field.value || false}
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          field.onChange(checked);

                                          if (
                                            [
                                              "edit",
                                              "create",
                                              "delete",
                                            ].includes(action) &&
                                            checked
                                          ) {
                                            setValue(
                                              `permissions.${module._id}.view`,
                                              true,
                                            );
                                          }
                                        }}
                                        disabled={
                                          action === "view" && isViewDisabled
                                        }
                                      />
                                    )}
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </MidBox>

          <BottomBox>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isUpdate ? "Update" : "Create"}
            </Button>
            <Button onClick={handleOnCancelCreate} variant="outlined">
              Cancel
            </Button>
          </BottomBox>
        </form>
      </BoxContainer>
    </div>
  );
}
