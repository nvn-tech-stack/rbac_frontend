import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useUserManagement } from "../../hooks/user-management";
import { useToast } from "../../hooks/Toast";

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
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const {
    setRoleSearch,
    setUserSearch,
    tabValue,
    modulePermissions,
    roleInfo,
    roles,
  } = useUserManagement();
  const navigate = useNavigate();
  const showToast = useToast();

  const handleOnOpenCreate = () => {
    if (roles.length === 1 && labelName === "User") {
      showToast("Please create a role first.", "info");
      return;
    }

    if (labelName === "User") {
      navigate("/admin/user-management/new-user");
    } else if (labelName === "Role") {
      navigate("/admin/user-management/new-role");
    }
  };

  const handleCloseFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const handleOpenFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const { control, reset } = useForm({
    mode: "all",
  });

  const searchValue = useWatch({
    control,
    name: "search",
  });

  useEffect(() => {
    reset({ search: "" });

    if (tabValue === 0) {
      setUserSearch("");
    } else if (tabValue === 1) {
      setRoleSearch("");
    }
  }, [tabValue, setUserSearch, setRoleSearch, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tabValue === 0) {
        setUserSearch(searchValue);
      } else if (tabValue === 1) {
        setRoleSearch(searchValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, tabValue, setRoleSearch, setUserSearch]);
  return (
    <>
      <HeaderContianer>
        <SearchAndFilterContianer>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
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
            )}
          />

          <CiFilter
            onClick={handleOpenFilter}
            style={{ fontSize: 30, cursor: "pointer", margin: 3 }}
          />
          <FilterModal
            handleCloseFilter={handleCloseFilter}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
          />
        </SearchAndFilterContianer>
        <Box>
          {modulePermissions &&
            modulePermissions.length > 0 &&
            modulePermissions.map(
              (p) =>
                p.is_create &&
                p.is_view && (
                  <Button onClick={handleOnOpenCreate} variant="contained">
                    Add {labelName}
                  </Button>
                ),
            )}
          {roleInfo?.name === "Admin" && roleInfo?.type === "admin" && (
            <Button onClick={handleOnOpenCreate} variant="contained">
              Add {labelName}
            </Button>
          )}
        </Box>
      </HeaderContianer>
      <Divider />
    </>
  );
}

export default Header;
