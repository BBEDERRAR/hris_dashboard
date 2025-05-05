"use client";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import DownloadIcon from "@mui/icons-material/Download";
import type { Employee } from "@/graphql/type";
import { exportToCSV } from "@/utils/exportUtils";

interface BirthdaysThisWeekProps {
  data: Employee[];
}

export function BirthdaysThisWeek({ data }: BirthdaysThisWeekProps) {
  const handleExport = () => {
    exportToCSV(data, "birthdays-this-week.csv");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography variant="h5" component="h2">
          Birthdays This Week
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
          disabled={!data || data.length === 0}
          size="small"
          sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}
        >
          Export
        </Button>
      </Box>

      {data && data.length > 0 ? (
        <List>
          {data.map((employee) => (
            <ListItem key={employee.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <CakeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={employee.name}
                secondary={`${employee.department} • ${new Date(
                  employee.dateOfBirth
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
          No birthdays this week
        </Typography>
      )}
    </>
  );
}
