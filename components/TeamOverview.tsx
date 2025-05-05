"use client";

import {
  Typography,
  Paper,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import type { TeamStats } from "@/graphql/type";

// Stat card component for displaying statistics
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value?: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: `${color}.light`,
        color: `${color}.dark`,
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="inherit">
          {title}
        </Typography>
        <Box sx={{ color: `${color}.main` }}>{icon}</Box>
      </Box>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
        {value !== undefined ? value : <CircularProgress size={20} />}
      </Typography>
    </Paper>
  );
}

interface TeamOverviewProps {
  data: TeamStats;
}

export function TeamOverview({ data }: TeamOverviewProps) {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Team Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="Total Employees"
            value={data?.totalEmployees}
            icon={<PeopleIcon />}
            color="primary"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="Active"
            value={data?.activeEmployees}
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <StatCard
            title="On Leave"
            value={data?.onLeaveEmployees}
            icon={<BeachAccessIcon />}
            color="warning"
          />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        Department Breakdown
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {data?.departments && data.departments.length > 0 ? (
        data.departments.map((dept, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            {typeof dept === "string" ? (
              <Typography>{dept}</Typography>
            ) : (
              <>
                <Typography>{dept.name}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {dept.employeeCount}
                </Typography>
              </>
            )}
          </Box>
        ))
      ) : (
        <Typography color="text.secondary">
          No department data available
        </Typography>
      )}
    </>
  );
}
