import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const HeaderContianer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 10,
  alignItems: "center",
  width: "100%",
});
const SearchAndFilterContianer = styled(Box)({
  display: "flex",
  marginTop: 2,
});

function Header({ labelName }: { labelName: string }) {
  const navigate = useNavigate();
  const handleOnOpenCreate = () => {
    if (labelName === "User") {
      navigate("/admin/user-management/new-user");
    } else if (labelName === "Role") {
      navigate("/admin/user-management/new-role");
    }
  };
  return (
    <>
      <HeaderContianer>
        <SearchAndFilterContianer>
          <TextField
            type="text"
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CiSearch style={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: 250,
              "& .MuiInputBase-root": {
                height: 35,
                fontSize: 14,
              },
            }}
          />
          <CiFilter style={{ fontSize: 30, cursor: "pointer", margin: 3 }} />
        </SearchAndFilterContianer>
        <Box>
          <Button onClick={handleOnOpenCreate} variant="contained">
            Add {labelName}
          </Button>
        </Box>
      </HeaderContianer>
      <Divider />
    </>
  );
}

export default Header;
