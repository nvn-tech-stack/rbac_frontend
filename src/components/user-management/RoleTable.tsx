import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getStatusStyle } from "../../utils/helper";

export default function RoleTable() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 570, maxWidth: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Manager</TableCell>
              <TableCell>
                <span style={getStatusStyle("active")}>active</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Backend developer</TableCell>
              <TableCell>
                <span style={getStatusStyle("inactive")}> inactive</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalsUserResults}
        rowsPerPage={UserLimit}
        page={UserPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      /> */}
    </Paper>
  );
}
