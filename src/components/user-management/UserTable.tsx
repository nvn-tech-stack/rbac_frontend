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
  if (userData.length === 0) {
    return <h1>No user found</h1>;
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 570 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Sign In</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userData.length >= 0 &&
              userData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
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
                    {fullDateTimeFormat(row?.last_sign_in) || "-"}
                  </TableCell>
                  <TableCell>
                    <HiDotsVertical style={{ fontSize: 20, display: "none" }} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
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
