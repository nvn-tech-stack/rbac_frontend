import { Box } from "@mui/material";

import Header from "../../components/user-management/Header";

import UserTable from "../../components/user-management/UserTable";
import RoleTable from "../../components/user-management/RoleTable";
import { useUserManagement } from "../../hooks/user-management";
import CommonTabs from "../../components/CommonTabs";

export default function UserManagement() {
  const {
    users,
    UserLimit,
    UserPage,
    handleChangePage,
    handleChangeRowsPerPage,
    totalsUserResults,
  } = useUserManagement();
  const tabs = [
    {
      label: "User",
      content: (
        <>
          <Header labelName="User" />,
          <UserTable
            userData={users}
            UserLimit={UserLimit}
            UserPage={UserPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            totalsUserResults={totalsUserResults}
          />
        </>
      ),
    },
    {
      label: "Role",
      content: (
        <>
          <Header labelName="Role" />,
          <RoleTable />
        </>
      ),
    },
  ];
  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <CommonTabs tabs={tabs} />
      </Box>
    </div>
  );
}
