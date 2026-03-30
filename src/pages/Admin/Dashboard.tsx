import Container from "../../components/Container";

import { Box, Card, CardContent, styled, Typography } from "@mui/material";

const CardStyled = styled(Card)({
  minWidth: 200,
  flex: 1,
  backgroundColor: "#f22727dd",
});
function Dashboard() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mt: 3,
        }}
      >
        <CardStyled>
          <CardContent>
            <Typography sx={{ color: "white" }} variant="h6">
              Users
            </Typography>
            <Typography sx={{ color: "white" }} variant="h4">
              120
            </Typography>
          </CardContent>
        </CardStyled>

        <CardStyled>
          <CardContent>
            <Typography sx={{ color: "white" }} variant="h6">
              roles
            </Typography>
            <Typography sx={{ color: "white" }} variant="h4">
              75
            </Typography>
          </CardContent>
        </CardStyled>

        <CardStyled>
          <CardContent>
            <Typography sx={{ color: "white" }} variant="h6">
              Vendors
            </Typography>
            <Typography sx={{ color: "white" }} variant="h4">
              6
            </Typography>
          </CardContent>
        </CardStyled>
      </Box>
    </Container>
  );
}

export default Dashboard;
