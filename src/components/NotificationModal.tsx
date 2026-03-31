import { Button, Modal, Box, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard";

import { useNotification } from "../hooks/notification";

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
  const { notifications } = useNotification();

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
            {notifications?.length > 0 ? (
              notifications?.map((notification: any) => (
                <NotificationCard
                  key={notification._id}
                  id={notification._id}
                  notificatonRead={notification.is_read}
                  title={notification.title}
                  description={notification.description}
                  createdAt={notification.createdAt}
                  userName={notification.user?.first_name}
                />
              ))
            ) : (
              <Typography variant="body2">
                No notifications available.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default NotificationModal;
