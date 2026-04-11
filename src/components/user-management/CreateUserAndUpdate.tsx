import {
  Box,
  Button,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserManagement } from "../../hooks/user-management";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../hooks/Toast";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/user";
import { useAuth } from "../../hooks/auth";

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",

  marginTop: "20px",
  height: "90vh",
});
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .createUser": {
    marginLeft: "10px",
  },
  marginBottom: "30px",
});

const MidBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 1,
  height: 500,
  overflowY: "auto",
});

const BottomBox = styled(Box)({
  display: "flex",
  width: 300,
  justifyContent: "space-between",
  marginLeft: "10px",
});

const TextFieldStyled = styled(TextField)({
  width: 300,

  "& .MuiInputBase-root": {
    height: 40,
    fontSize: 15,
  },
});

export default function CreateUserAndUpdate() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { userId } = useParams();
  const isUpdate = Boolean(userId);
  const {
    setTabValue,
    roles,
    mumtateCreateUser,
    mumtateUpdateUser,
    userId: loginUserId,
  } = useUserManagement();
  const { user: userData } = useAuth();
  const { data: user = {} } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => {
      if (userId) {
        return getUserById(userId);
      }
    },
    enabled: !!userId,
  });

  const userInfo = user?.results;

  const handleOnCancelCreate = () => {
    setTabValue(0);
    navigate("/admin/user-management");
  };

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  const handleOnSubmit = (data: any) => {
    if (isUpdate) {
      mumtateUpdateUser(
        {
          id: userId,
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            designation: data.designation,
            role_id: data.role_id,
          },
        },
        {
          onSuccess: () => {
            showToast("User updated successfully", "success");
            reset();
            setTabValue(0);
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
      mumtateCreateUser(
        {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            owner: loginUserId,
            designation: data.designation,
            role_id: data.role_id,
          },
        },
        {
          onSuccess: () => {
            showToast("User created successfully", "success");
            reset();
            setTabValue(0);
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
    if (userId && userInfo) {
      reset({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone: userInfo.phone,
        designation: userInfo.designation,
        role_id: userInfo.role_id,
      });
    }
  }, [userId, userInfo, reset]);

  const allowedRoles = ["Admin"];

  return (
    <div>
      <BoxContainer>
        <TopBox>
          <RxCross2
            onClick={handleOnCancelCreate}
            style={{
              fontSize: 25,
              margin: 1,
              cursor: "pointer",
            }}
          />
          <Typography className="createUser" variant="h6">
            {isUpdate ? "Edit User" : "Create New User"}
          </Typography>
        </TopBox>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <MidBox>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">First Name *</Typography>
              <Controller
                name="first_name"
                rules={{
                  required: "first name is required",
                }}
                defaultValue=""
                control={control}
                render={({ field, fieldState }) => (
                  <TextFieldStyled
                    {...field}
                    placeholder="First Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Last Name</Typography>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextFieldStyled
                    {...field}
                    placeholder="Last Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Email *</Typography>

              <Controller
                name="email"
                rules={{
                  required: "email is required",
                }}
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextFieldStyled
                    {...field}
                    placeholder="Email"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Phone</Typography>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextFieldStyled
                    {...field}
                    placeholder="Phone number"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Designation</Typography>

              <Controller
                name="designation"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      displayEmpty
                      size="small"
                      sx={{ width: 300 }}
                      error={!!fieldState.error}
                    >
                      <MenuItem value="">
                        <em
                          style={{
                            fontSize: "13px",
                            color: "#999",
                            fontStyle: "normal",
                          }}
                        >
                          Select
                        </em>
                      </MenuItem>

                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                    {fieldState.error && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="body2">Role *</Typography>

              <Controller
                name="role_id"
                control={control}
                rules={{
                  required: "role is required",
                }}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      displayEmpty
                      size="small"
                      sx={{
                        width: 300,
                      }}
                      error={!!fieldState.error}
                      disabled={
                        userData?.role?.type === "admin" &&
                        allowedRoles.includes(userData?.role?.name)
                          ? false
                          : true
                      }
                    >
                      <MenuItem value="">
                        <em
                          style={{
                            fontSize: "13px",
                            color: "#999",
                            fontStyle: "normal",
                          }}
                        >
                          Select
                        </em>
                      </MenuItem>
                      {roles && roles.length > 0
                        ? roles
                            .filter((d) => d.status === "active")
                            .map((role) => (
                              <MenuItem key={role._id} value={role._id}>
                                {role.name}
                              </MenuItem>
                            ))
                        : null}
                    </Select>
                    {fieldState.error && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontStyle: "normal",
                        }}
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </Box>
          </MidBox>
          <BottomBox>
            <Button type="submit" disabled={isSubmitting} variant="contained">
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
