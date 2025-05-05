import { Box, Container, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
    </Box>
  );
}
