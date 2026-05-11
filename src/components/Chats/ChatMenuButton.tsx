import { Menu, MenuItem } from "@mui/material";
import { useChats } from "../../hooks/chat";

const ChatMenuButton = ({
  handleCloseMenu,
  anchorEl,
  chatId,
  editMessage,
  handleEditMessage,
}: {
  handleCloseMenu: any;
  anchorEl: any;
  chatId: string | null;
  editMessage: any;
  handleEditMessage: any;
}) => {
  const open = Boolean(anchorEl);

  const { handleDeleteChat } = useChats();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClick={handleCloseMenu}
      slotProps={{
        paper: {
          elevation: 0,
          sx: { boxShadow: "none", border: "1px solid #d3d3d3" },
        },
      }}
    >
      <MenuItem
        onClick={() => handleDeleteChat(chatId)}
        sx={{
          color: "red",
        }}
      >
        Delete
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleEditMessage(editMessage);
          handleCloseMenu();
        }}
      >
        Edit
      </MenuItem>
    </Menu>
  );
};

export default ChatMenuButton;
