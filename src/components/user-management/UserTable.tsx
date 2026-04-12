import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { HiDotsVertical } from "react-icons/hi";

import { fullDateTimeFormat, getStatusStyle } from "../../utils/helper";
import type { User } from "../../utils/interfaces";
import { useState } from "react";
import UserMenuButton from "./UserMenuButton";
import { useAuth } from "../../hooks/auth";
import { useUserManagement } from "../../hooks/user-management";

type UserTableProps = {
  userData: User[];
  UserLimit: number;
  UserPage: number;
  handleChangeRowsPerPage: any;
  handleChangePage: any;
  totalsUserResults: number;
};

export default function UserTable({
  userData,
  UserLimit,
  UserPage,
  handleChangePage,
  handleChangeRowsPerPage,
  totalsUserResults,
}: UserTableProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const { user } = useAuth();
  const { modulePermissions, roleInfo } = useUserManagement();

  const handleClickUserMenu = (e: any, row: any) => {
    setUserId(row._id);
    setUserEmail(row.email);
    setAnchorEl(e.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    setUserId(null);
    setUserEmail("");
  };

  if (userData.length === 0) {
    return <h1>No user found</h1>;
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Sign In</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userData && userData.length > 0 ? (
              userData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    background: row._id === user?._id ? "#b9f8dbee" : "none",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone || "-"}</TableCell>
                  <TableCell>{row.designation || "-"}</TableCell>
                  <TableCell>
                    <span style={getStatusStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell>
                    {row?.role?.name === "Admin"
                      ? "Admin(Owner)"
                      : row?.role?.name}
                  </TableCell>
                  <TableCell>
                    {fullDateTimeFormat(row?.last_sign_in) || "-"}
                  </TableCell>
                  <TableCell>
                    {modulePermissions &&
                      modulePermissions.length > 0 &&
                      modulePermissions.map(
                        (m) =>
                          m.is_view &&
                          m.is_edit && (
                            <>
                              <HiDotsVertical
                                onClick={(e) => handleClickUserMenu(e, row)}
                                style={{
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              />
                            </>
                          ),
                      )}

                    {roleInfo?.type === "admin" &&
                      roleInfo?.name === "Admin" && (
                        <>
                          <HiDotsVertical
                            onClick={(e) => handleClickUserMenu(e, row)}
                            style={{
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          />
                        </>
                      )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No user found</TableCell>
              </TableRow>
            )}
          </TableBody>
          {userId && (
            <UserMenuButton
              userId={userId}
              anchorEl={anchorEl}
              userEmail={userEmail}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalsUserResults}
        rowsPerPage={UserLimit}
        page={UserPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </Paper>
  );
}
