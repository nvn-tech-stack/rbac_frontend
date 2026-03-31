import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useAuth } from "../hooks/auth";
import { Controller, useForm } from "react-hook-form";
import type { SignUp } from "../utils/interfaces";
import { signup } from "../utils/initialValues";

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

export default function ForgotPassword() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUp>({
    mode: "all",
    defaultValues: signup,
  });

  const { handleSendEmail } = useAuth();
  const onSubmit = async (data: SignUp) => {
    await handleSendEmail(data.email);
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
            <Typography variant="body1" sx={{ color: "gray", width: 300 }}>
              Enter your email address and we'll send you a link to reset your
              password.
            </Typography>

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
              render={({ field, formState: { errors } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  placeholder="Enter your email"
                  fullWidth
                  helperText={errors.email ? errors.email.message : null}
                  error={!!errors.email}
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
              Send Email
            </Button>
          </FormBox>
        </form>
      </ContainerBox>
    </div>
  );
}
