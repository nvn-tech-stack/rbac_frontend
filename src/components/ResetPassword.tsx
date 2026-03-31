import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/auth";
import { Controller, useForm } from "react-hook-form";
import type { SignUp } from "../utils/interfaces";
import { signup } from "../utils/initialValues";
import { useSearchParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";

const ContainerBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: 50,

  borderRadius: 2,
  justifyContent: "end",
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUp>({
    mode: "all",
    defaultValues: signup,
  });
  const { handleForgotPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (data: SignUp) => {
    console.log("Token ::--->", token);
    console.log("Data ::--->", data);
    await handleForgotPassword({ token, newPassword: data.password });
    reset();
  };

  return (
    <div>
      <ContainerBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBox>
            <Typography variant="h5">
              <b>New Password</b>
            </Typography>

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
                },
              }}
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  placeholder="Enter your new password"
                  type={showPassword ? "text" : "password"}
                  helperText={errors.password ? errors.password.message : null}
                  error={!!errors.password}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <BsEye style={{ fontSize: 20 }} />
                            ) : (
                              <RiEyeCloseLine style={{ fontSize: 20 }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    width: 300,
                    "& .MuiInputBase-root": {
                      height: 40,
                    },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                width: 300,
                height: 40,
              }}
            >
              Update Password
            </Button>
          </FormBox>
        </form>
      </ContainerBox>
    </div>
  );
}
