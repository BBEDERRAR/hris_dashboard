import { Container, Paper, Typography, Box } from "@mui/material";
import { EmployeesOnLeave } from "@/components/EmployeesOnLeave";
import { BirthdaysThisWeek } from "@/components/BirthdaysThisWeek";
import { TeamOverview } from "@/components/TeamOverview";
import { fetchDashboardData } from "@/app/actions/fetchDashabordDataAction";

export default async function DashboardPage() {
  // Fetch initial data for SSR
  const initialData = await fetchDashboardData();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        HRIS Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: { md: 2 } }}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <EmployeesOnLeave
              leaves={initialData.allEmployeesOnLeaveTodays}
              departments={initialData.allDepartments}
            />
          </Paper>
        </Box>
        <Box
          sx={{
            flex: { md: 1 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Paper elevation={2} sx={{ p: 3 }}>
            <TeamOverview data={initialData.TeamOverview} />
          </Paper>
          <Paper elevation={2} sx={{ p: 3 }}>
            <BirthdaysThisWeek data={initialData.allBirthdaysThisWeeks} />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
