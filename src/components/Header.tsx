import { useState } from "react";

import { AppBar, Box, Toolbar } from "@mui/material";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import NotificationModal from "./NotificationModal";
 import MenuModal from "./MenuModal";


const Header = () => {
  const [openNotification, setOpenNotification] = useState(false);

  const handleOpenNotification = () => setOpenNotification(true);
  const handleCloseNotification = () => setOpenNotification(false);
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
              marginRight:2
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 8,
                height: 8,
                background: "red",
                borderRadius: "50%",
              }}
            ></span>

            <NotificationsSharpIcon
              onClick={handleOpenNotification}
              sx={{
                fontSize: 25,
                color: "black",
              }}
            />
            <NotificationModal
              handleCloseNotification={handleCloseNotification}
              openNotification={openNotification}
            />
          </Box>
         <MenuModal/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
