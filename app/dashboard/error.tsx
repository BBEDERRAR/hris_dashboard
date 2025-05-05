"use client";

import { useEffect } from "react";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          textAlign: "center",
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Something went wrong
        </Typography>
        <Alert severity="error" sx={{ mb: 4, width: "100%", maxWidth: "sm" }}>
          {error.message || "An unexpected error occurred"}
        </Alert>
        <Button variant="contained" onClick={reset} sx={{ mt: 2 }}>
          Try again
        </Button>
      </Box>
    </Container>
  );
}
