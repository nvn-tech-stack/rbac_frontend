import styled from "@emotion/styled";

import { Typography } from "@mui/material";
import Signup from "../components/Signup";

const LeftBox = styled("div")({
  p: 10,
});
const RightBox = styled("div")({});

const Login = () => {
  return (
    <div className="login">
      <div className="box-container">
        <LeftBox>
          <Typography variant="h3" fontWeight={600} color="white">
            Welcome <span style={{ color: "#ff0000" }}>Back</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 4, mb: 2, fontWeight: 500, width: "500px" }}
            color="white"
          >
            Sign in to your account to access your dashboard. manage your data,
            and continue your work securely.
          </Typography>
        </LeftBox>

        <RightBox>
          <Signup />
        </RightBox>
      </div>
    </div>
  );
};

export default Login;
