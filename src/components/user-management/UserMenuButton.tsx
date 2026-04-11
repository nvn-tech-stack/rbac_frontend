import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserManagement } from "../../hooks/user-management";
import { useToast } from "../../hooks/Toast";

const UserMenuButton = ({
  handleCloseUserMenu,
  anchorEl,
  userId,
  userEmail,
}: {
  handleCloseUserMenu: any;
  anchorEl: any;
  userId: string;
  userEmail: string;
}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const showToast = useToast();

  const { mumtateResendEmail } = useUserManagement();

  const handleResendEmail = (email: string) => {
    mumtateResendEmail(
      {
        data: {
          email: email,
        },
      },
      {
        onSuccess: () => {
          showToast("Resend email successfully", "success");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || "Something went wrong!";
          showToast(message, "error");
        },
      },
    );
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClick={handleCloseUserMenu}>
      <MenuItem onClick={() => handleResendEmail(userEmail)}>
        Resend email
      </MenuItem>
      <MenuItem
        onClick={() => navigate(`/admin/user-management/user-update/${userId}`)}
      >
        Edit
      </MenuItem>
    </Menu>
  );
};

export default UserMenuButton;
