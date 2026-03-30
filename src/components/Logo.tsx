import { styled, Typography } from "@mui/material";

const LogoHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  padding: "20px",
  alignItems: "center",
});

interface LogoProps {
  colorName?: string;
}

function Logo({ colorName = "white" }: LogoProps) {
  return (
    <div>
      <LogoHeader>
        <Typography sx={{ color: colorName, fontWeight: "bold" ,fontSize:20}}>
          Admin Portal
        </Typography>
      </LogoHeader>
    </div>
  );
}

export default Logo;
