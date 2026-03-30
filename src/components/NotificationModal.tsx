import { Button, Modal, Box, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { Height } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "8%",
  right: "1%",

  width: "25%",
  bgcolor: "white",
  boxShadow: 10,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

type NotificationProps = {
  openNotification: boolean;
  handleCloseNotification: () => void;
};

function NotificationModal({
  openNotification,
  handleCloseNotification,
}: NotificationProps) {
  const [notificatonRead] = useState<boolean>(false);

  return (
    <div>
      <Modal
        open={openNotification}
        onClose={handleCloseNotification}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              pb: 1,
              mb: 2,
            }}
          >
            <Typography variant="body1">Notification</Typography>
            <Button onClick={handleCloseNotification}>Close</Button>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "600px",
            }}
          >
            <NotificationCard notificatonRead={notificatonRead} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
            <NotificationCard notificatonRead={true} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default NotificationModal;
