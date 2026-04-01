import {
  Box,
  Button,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

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
  "& .createUser": {
    marginLeft: "10px",
  },
  marginBottom: "30px",
});

const MidBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 10,
  height: 600,
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

export default function CreateUser() {
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { setTabValue } = useUserManagement();
  const handleOnCancelCreate = () => {
    setTabValue(0);
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
          <Typography className="createUser" variant="h6">
            Create New User
          </Typography>
        </TopBox>
        <MidBox>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">First Name *</Typography>
            <TextFieldStyled placeholder="First Name" />
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Last Name</Typography>
            <TextFieldStyled placeholder="First Name" />
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Email *</Typography>
            <TextFieldStyled placeholder="First Name" />
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Phone</Typography>
            <TextFieldStyled placeholder="First Name" />
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Designation</Typography>

            <Select
              value={designation}
              displayEmpty
              onChange={(e) => setDesignation(e.target.value)}
              size="small"
              sx={{
                width: 300,
              }}
            >
              <MenuItem value="">
                <em
                  style={{
                    fontSize: "13px",
                    color: "#999",
                    fontStyle: "normal",
                  }}
                >
                  Select
                </em>
              </MenuItem>

              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </Box>
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">Role *</Typography>

            <Select
              value={role}
              displayEmpty
              onChange={(e) => setRole(e.target.value)}
              size="small"
              sx={{
                width: 300,
              }}
            >
              <MenuItem value="">
                <em
                  style={{
                    fontSize: "13px",
                    color: "#999",
                    fontStyle: "normal",
                  }}
                >
                  Select
                </em>
              </MenuItem>

              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
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
