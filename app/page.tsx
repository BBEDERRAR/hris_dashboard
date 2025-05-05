"use client";

import { Typography, Box, Button } from "@mui/material";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
        HRIS Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        A centralized platform for managing your organization's human resources
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push("/dashboard")}
        sx={{ mt: 2 }}
      >
        Get Started
      </Button>
    </Box>
  );
}
