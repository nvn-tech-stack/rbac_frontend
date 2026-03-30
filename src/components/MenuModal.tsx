import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import ConfirmDialog from "./ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/localStorage";
import { useQueryClient } from "@tanstack/react-query";

const MenuModal = () => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    setOpenConfirm((prev) => !prev);
    clearToken();
    queryClient.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <>
      <HiDotsVertical
        className="menu"
        onClick={() => setOpen((prev) => !prev)}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "60px",
            right: "20px",
            width: 180,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            outline: "none",
            p: 1,
          }}
        >
          <Typography
            sx={{ p: 1, cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
          >
            Profile
          </Typography>

          <Typography
            sx={{ p: 1, cursor: "pointer", "&:hover": { bgcolor: "#f5f5f5" } }}
          >
            Settings
          </Typography>
          <Typography
            sx={{
              p: 1,
              cursor: "pointer",
              color: "red",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
            onClick={() => setOpenConfirm((prev) => !prev)}
          >
            logout
          </Typography>
          <ConfirmDialog
            open={openConfirm}
            onClose={() => setOpenConfirm((prev) => !prev)}
            onConfirm={handleLogout}
            title="Logout"
            description="Are you sure you want to logout?"
            confirmText="Logout"
            cancelText="Cancel"
          />
        </Box>
      </Modal>
    </>
  );
};

export default MenuModal;
