import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Typography,
  Divider,
  IconButton,
  styled,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

import Logo from "./Logo";
import { Link } from "react-router-dom";
import type { User } from "../utils/interfaces";

interface SidebarProps {
  open: boolean;
  toggleDrawer: () => void;
  user: User | null;
}
const Circle = styled("div")({
  border: "10px solid red",
  width: 30,
  height: 30,
  borderRadius: "50%",
  margin: "0px 5px",
  backgroundColor: "white",
});
const ButtonStyled = styled(ListItemButton)({
  color: "white",
  "&:hover": {
    backgroundColor: "#545151dd",
  },
});

const Sidebar = ({ open, toggleDrawer, user }: SidebarProps) => {
  console.log("User ::--->", user);
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 200 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "black",
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          paddingLeft: 1,
        }}
      >
        <List>
          <ListItemButton
            sx={{
              marginLeft: -1,
            }}
          >
            <ListItemIcon>{open ? <Logo /> : <Circle />}</ListItemIcon>
          </ListItemButton>
          <Link
            to="dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ButtonStyled>
              <ListItemIcon>
                <DashboardIcon fontSize="medium" sx={{ color: "white" }} />
              </ListItemIcon>

              {open && (
                <ListItemText sx={{ marginLeft: -3 }} primary="Dashboard" />
              )}
            </ButtonStyled>
          </Link>
          <Link
            to="user-management"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ButtonStyled>
              <ListItemIcon>
                <GroupIcon sx={{ color: "white" }} fontSize="medium" />
              </ListItemIcon>

              {open && (
                <ListItemText
                  sx={{ marginLeft: -3 }}
                  primary="User Management"
                />
              )}
            </ButtonStyled>
          </Link>
        </List>
      </Box>

      <Box>
        <Divider />

        <Box
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 35, height: 35, mr: open ? 1.5 : 0 }}>N</Avatar>

          {open && (
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "white" }}
                fontWeight={600}
              >
                {user?.first_name}
              </Typography>
              <Typography sx={{ color: "white" }} variant="caption">
                {user?.role?.name}
              </Typography>
            </Box>
          )}

          <IconButton onClick={toggleDrawer} size="small">
            {open ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
