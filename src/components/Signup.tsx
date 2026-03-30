import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";

import { FcGoogle } from "react-icons/fc";

import { RiEyeCloseLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import type { SignUp } from "../utils/interfaces.ts";
import { signup } from "../utils/initialValues";

import { useState } from "react";
import { enumOfRoles } from "../utils/enums.ts";
import { useAuth } from "../hooks/auth/index.tsx";

const Signup = () => {
  const { mutateRegister, mutateLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setLogin] = useState(true);

  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUp>({
    mode: "all",
    defaultValues: signup,
  });

  const handleLogin = () => {
    setLogin((prev) => !prev);
  };
  const handleGoogleLogin = () => {
    navigate("/oauth/google/admin");
  };
  const onSubmit = async (data: SignUp) => {
    try {
      if (isLogin) {
        mutateLogin({
          data: {
            email: data.email,
            password: data.password,
          },
          params: {
            type: enumOfRoles.ADMIN,
          },
        });
      } else {
        mutateRegister({
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            newPassword: data.password,
          },
          params: {
            type: enumOfRoles.ADMIN,
          },
        });
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container
          sx={{
            background: "#fff",
            borderRadius: 4,
            p: 5,
            boxShadow: 5,
            width: 450,
          }}
        >
          <Typography variant="h5" fontWeight={500} align="center">
            {!isLogin ? "Sign up" : "Log in"}
          </Typography>

          <Typography align="center" sx={{ mt: 1, mb: 3 }}>
            Already have an account?{" "}
            <Link href="#" onClick={handleLogin} underline="hover">
              {!isLogin ? "Log in" : "Sign up"}
            </Link>
          </Typography>

          {!isLogin && (
            <Controller
              name="first_name"
              rules={{
                required: "first name is required",
                validate: (value) =>
                  value.trim() !== "" || "First name cannot be empty",
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First name*"
                  margin="normal"
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
          )}

          {!isLogin && (
            <Controller
              name="last_name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last name"
                  margin="normal"
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              )}
            />
          )}

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Email address*"
                margin="normal"
                helperText={error ? error.message : null}
                error={!!error}
              />
            )}
          />

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
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Password (8+ characters)*"
                type={showPassword ? "text" : "password"}
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <BsEye /> : <RiEyeCloseLine />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Box display="flex" alignItems="flex-start" mt={2}>
            <Typography variant="body2">
              <Link href="#">Forgot Password</Link>
            </Typography>
          </Box>

          {isLogin ? (
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 10,
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "#2e56c2" },
                color: "white",
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 10,
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "#2e56c2" },
                color: "white",
              }}
            >
              Create account
            </Button>
          )}

          <Box mt={3} display="flex" justifyContent="space-between" gap={2}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 10,
              }}
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={30} />
            </Button>
          </Box>
        </Container>
      </form>
    </Box>
  );
};

export default Signup;
