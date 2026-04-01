import { Tabs, Tab, Box } from "@mui/material";

import { useUserManagement } from "../hooks/user-management";

type TabItem = {
  label: string;
  content: React.ReactNode;
};

interface SimpleTabsProps {
  tabs: TabItem[];
}

export default function CommonTabs({ tabs }: SimpleTabsProps) {
  const { setTabValue, tabValue } = useUserManagement();

  return (
    <Box width="100%">
      <Tabs
        value={tabValue}
        onChange={(_e, newValue) => setTabValue(newValue)}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: 2,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              textTransform: "none",
              "&.Mui-selected": {
                fontWeight: "bold",
              },
            }}
          />
        ))}
      </Tabs>
      <Box>{tabs[tabValue]?.content}</Box>
    </Box>
  );
}
