import { Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useUserManagement } from "../../hooks/user-management";

const RoleMenuButton = ({
  handleCloseRoleMenu,
  anchorEl,
  roleId,
  status,
}: {
  handleCloseRoleMenu: any;
  anchorEl: any;
  roleId: string;
  status: string | null;
}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { handleActiveAndInactive } = useUserManagement();

  return (
    <Menu anchorEl={anchorEl} open={open} onClick={handleCloseRoleMenu}>
      <MenuItem
        onClick={() =>
          handleActiveAndInactive(
            roleId,
            status === "active" ? "inactive" : "active",
          )
        }
      >
        {status === "active" ? "Inactive" : "Active"}
      </MenuItem>
      <MenuItem
        onClick={() => navigate(`/admin/user-management/role-update/${roleId}`)}
      >
        Edit
      </MenuItem>
    </Menu>
  );
};

export default RoleMenuButton;
