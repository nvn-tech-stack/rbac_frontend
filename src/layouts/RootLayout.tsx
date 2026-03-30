import styled from "@emotion/styled";
import { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { useAuth } from "../hooks/auth";

const StyleContainer = styled("div")({
  display: "flex",
  width: "100%",
});

const RootLayout = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { user } = useAuth();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <StyleContainer>
        <Header />
        <div className="left-con">
          <Sidebar open={open} toggleDrawer={toggleDrawer} user={user} />
        </div>

        <Box sx={{ mt: 8, ml: 1, mr: 5, width: "100%" }}>
          <Outlet />
        </Box>
      </StyleContainer>
    </div>
  );
};

export default RootLayout;
