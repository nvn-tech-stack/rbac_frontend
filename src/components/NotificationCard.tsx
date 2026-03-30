import { Card, Box, Typography, Avatar } from "@mui/material";

type NotificationCardProps = {
  notificatonRead: boolean;
};

const NotificationCard = ({ notificatonRead }: NotificationCardProps) => {
  return (
    <Card
      sx={{
        p: 2,
        mb: 1.5,
        boxShadow: 2,
        cursor: "pointer",

        backgroundColor: !notificatonRead ? "#7fd1f1dd" : "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ width: 30, height: 30 }}>A</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            Admin added a new user
          </Typography>

          <Typography variant="caption" color="gray">
            2 minutes ago
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationCard;
