import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getStatusStyle } from "../../utils/helper";
import { useUserManagement } from "../../hooks/user-management";
import { TablePagination } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import RoleMenuButton from "./RoleMenuButton";

export default function RoleTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleClickRoleMenu = (e: any, role: any) => {
    setRoleId(role._id);
    setStatus(role.status);
    setAnchorEl(e.currentTarget);
  };
  const handleCloseRoleMenu = () => {
    setAnchorEl(null);
    setRoleId(null);
  };

  const {
    roles,
    isRoleLoading,
    RoleLimit,
    RolePage,
    handleRoleChangePage,
    handleRoleChangeRowsPerPage,
    totalsRoleResults,
    modulePermissions,
    roleInfo,
  } = useUserManagement();

  if (isRoleLoading) {
    return <h1>Loading...</h1>;
  }
  if (roles.length === 0) {
    return <h1>No role found</h1>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 570 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles && roles.length > 0 ? (
              roles.map((role) => (
                <TableRow
                  key={role._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <span style={getStatusStyle(role.status)}>
                      {role.status || "Owner"}
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  {role.status ? (
                    <TableCell align="right">
                      {modulePermissions &&
                        modulePermissions.length > 0 &&
                        modulePermissions.map(
                          (m) =>
                            m.is_view &&
                            m.is_edit && (
                              <>
                                <HiDotsVertical
                                  onClick={(e) => handleClickRoleMenu(e, role)}
                                  style={{ fontSize: 20, cursor: "pointer" }}
                                />
                              </>
                            ),
                        )}

                      {roleInfo?.type === "admin" &&
                        roleInfo?.name === "Admin" && (
                          <>
                            <HiDotsVertical
                              onClick={(e) => handleClickRoleMenu(e, role)}
                              style={{ fontSize: 20, cursor: "pointer" }}
                            />
                          </>
                        )}
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No role found</TableCell>
              </TableRow>
            )}

            {roleId && (
              <RoleMenuButton
                roleId={roleId}
                anchorEl={anchorEl}
                handleCloseRoleMenu={handleCloseRoleMenu}
                status={status}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalsRoleResults}
        rowsPerPage={RoleLimit}
        page={RolePage}
        onPageChange={handleRoleChangePage}
        onRowsPerPageChange={handleRoleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
}
