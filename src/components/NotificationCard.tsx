import { Card, Box, Typography, Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNotification } from "../hooks/notification";
import { useNavigate } from "react-router-dom";

type NotificationCardProps = {
  notificatonRead: boolean;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userName: string;
  notificationType: string;
  handleCloseNotification: () => void;
};

const NotificationCard = ({
  notificatonRead,
  description,
  createdAt,
  userName,
  id,
  notificationType,
  handleCloseNotification,
}: NotificationCardProps) => {
  const notificationTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  const { handleReadNotifications } = useNotification();
  const navigate = useNavigate();

  const handleClick = async (id: string) => {
    await handleReadNotifications(id);
    if (notificationType === "Chats") {
      navigate("/admin/Chats");
    }
    handleCloseNotification();
  };

  return (
    <Card
      onClick={() => handleClick(id)}
      sx={{
        p: 2,
        mb: 1.5,
        boxShadow: 2,
        cursor: "pointer",

        backgroundColor: !notificatonRead ? "#7fd1f1dd" : "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 30, height: 30 }}>
          {userName?.charAt(0).toUpperCase() || "N/A"}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            {description}
          </Typography>

          <Typography variant="caption" color="gray">
            {notificationTime}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationCard;
