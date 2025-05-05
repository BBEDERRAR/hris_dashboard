"use client";

import { Container, Box, Paper, Skeleton } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header skeleton */}
      <Skeleton variant="text" width="250px" height={40} sx={{ mb: 3 }} />

      {/* Main content container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left column - Employees on Leave */}
        <Box sx={{ flex: { md: 2 } }}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            {/* Header with title and actions */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Skeleton variant="text" width="220px" height={32} />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={40}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={40}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Box>

            {/* Table header */}
            <Box sx={{ display: "flex", mb: 1, py: 1 }}>
              <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
              <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
              <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
              <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
              <Skeleton variant="text" width="20%" />
            </Box>

            {/* Table rows */}
            {[...Array(3)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  py: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                <Skeleton variant="text" width="20%" sx={{ mr: 2 }} />
                <Skeleton variant="text" width="20%" />
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Right column */}
        <Box
          sx={{
            flex: { md: 1 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Team Overview */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Skeleton variant="text" width="150px" height={32} sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 3,
              }}
            >
              {/* Three stat cards */}
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={100}
                  sx={{ flex: 1, borderRadius: 1 }}
                />
              ))}
            </Box>

            {/* Department breakdown section */}
            <Skeleton
              variant="text"
              width="220px"
              height={28}
              sx={{ mt: 3, mb: 2 }}
            />

            {/* Department items */}
            {[...Array(4)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1.5,
                }}
              >
                <Skeleton variant="text" width="120px" />
                <Skeleton variant="text" width="20px" />
              </Box>
            ))}
          </Paper>

          {/* Birthdays section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Skeleton variant="text" width="180px" height={32} />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Box>

            {/* Empty state or birthday list */}
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Skeleton variant="text" width="200px" height={24} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
