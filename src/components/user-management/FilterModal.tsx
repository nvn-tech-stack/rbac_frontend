import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useUserManagement } from "../../hooks/user-management";

export default function FilterModal({
  filterOpen,
  handleCloseFilter,
  setFilterOpen,
}: {
  filterOpen: boolean;
  handleCloseFilter: any;
  setFilterOpen: any;
}) {
  const { tabValue, SetroleqFilter, SetuserqFilter, setTabValue } =
    useUserManagement();

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  const handleFilterSubmit = (data: any) => {
    const cleanFilter: any = {};
    if (data.status) {
      cleanFilter.status = data.status;
    }
    if (tabValue === 0) {
      SetuserqFilter(cleanFilter);
      reset(cleanFilter);
      setTabValue(0);
    } else if (tabValue === 1) {
      SetroleqFilter(cleanFilter);
      reset(cleanFilter);
      setTabValue(1);
    }
    setFilterOpen(false);
  };
  return (
    <Dialog open={filterOpen} onClose={handleCloseFilter} sx={{}}>
      <DialogTitle>Filter</DialogTitle>
      <form onSubmit={handleSubmit(handleFilterSubmit)}>
        <DialogContent
          sx={{
            width: 300,
          }}
        >
          <Typography variant="body1">Status</Typography>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Select
                {...field}
                error={!!fieldState.error}
                displayEmpty
                sx={{
                  width: 250,
                  height: 40,
                  fontSize: 15,
                  "& .MuiSelect-select": {
                    padding: "10px",
                    fontSize: 15,
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                {tabValue === 0 ? null : (
                  <MenuItem value="inactive">Inactive</MenuItem>
                )}
                {tabValue == 0 ? (
                  <MenuItem value="pending">pending</MenuItem>
                ) : null}
              </Select>
            )}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
          }}
        >
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Apply
          </Button>
          <Button variant="outlined" onClick={handleCloseFilter}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
