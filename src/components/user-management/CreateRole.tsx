import {
  Box,
  Button,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useUserManagement } from "../../hooks/user-management";

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",

  marginTop: "20px",
  height: "90vh",
});
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .createRole": {
    marginLeft: "10px",
  },
  marginBottom: "30px",
});

const MidBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 10,
  height: 500,
  overflowY: "auto",
});

const BottomBox = styled(Box)({
  display: "flex",
  width: 300,
  justifyContent: "space-between",
  marginLeft: "19px",
});

const TextFieldStyled = styled(TextField)({
  width: 300,

  "& .MuiInputBase-root": {
    height: 40,
    fontSize: 15,
  },
});

export default function CreateRole() {
  const navigate = useNavigate();
  const { setTabValue } = useUserManagement();
  const handleOnCancelCreate = () => {
    setTabValue(1);
    navigate("/admin/user-management");
  };

  return (
    <div>
      <BoxContainer>
        <TopBox>
          <RxCross2
            onClick={handleOnCancelCreate}
            style={{
              fontSize: 25,
              margin: 1,
              cursor: "pointer",
            }}
          />
          <Typography className="createRole" variant="h6">
            Create New Role
          </Typography>
        </TopBox>
        <MidBox>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Role Name *</Typography>
            <TextFieldStyled placeholder="Role Name" />
          </Box>
          <Box sx={{ p: 1, mb: 1 }}>
            <Typography variant="h5">Module Access </Typography>
          </Box>
          <Box>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Module Name</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Create</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>Dashboard</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>User Management</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>Chats</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </MidBox>
        <BottomBox>
          <Button variant="contained">Create</Button>
          <Button onClick={handleOnCancelCreate} variant="outlined">
            Cancel
          </Button>
        </BottomBox>
      </BoxContainer>
    </div>
  );
}
