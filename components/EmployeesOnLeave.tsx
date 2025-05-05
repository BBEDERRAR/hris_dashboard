"use client";

import { useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import type { Department, Leave } from "@/graphql/type";
import { exportToCSV } from "@/utils/exportUtils";
import { useEmployeesOnLeaveByDepartment } from "@/graphql/hooks";

interface EmployeesOnLeaveProps {
  leaves: Leave[];
  departments: Department[];
}

export function EmployeesOnLeave({
  leaves,
  departments,
}: EmployeesOnLeaveProps) {
  const [department, setDepartment] = useState<string>("all");

  // Only fetch department data when not "all"
  const {
    data: departmentData,
    loading,
    error,
  } = useEmployeesOnLeaveByDepartment(department);

  // Use the departmentData if available, otherwise use the original leaves
  const displayedLeaves =
    department !== "all" && departmentData?.allEmployeesOnLeaveTodays
      ? departmentData.allEmployeesOnLeaveTodays
      : department === "all"
      ? leaves
      : leaves.filter((leave) => leave.department === department);

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
  };

  const handleExport = () => {
    exportToCSV(displayedLeaves, "employees-on-leave.csv");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h6">Error: {error.message}</Typography>
      </Box>
    );
  }

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
        <Typography
          variant="h5"
          component="h2"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Employees on Leave Today
        </Typography>
        <Box
          display="flex"
          gap={2}
          sx={{
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          <FormControl
            size="small"
            sx={{ minWidth: { xs: 120, sm: 150 }, flexGrow: { xs: 1, sm: 0 } }}
          >
            <InputLabel>Department</InputLabel>
            <Select
              value={department}
              label="Department"
              onChange={handleDepartmentChange}
            >
              <MenuItem value="all">All Departments</MenuItem>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.name}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!displayedLeaves || displayedLeaves.length === 0}
            sx={{ flexShrink: 0 }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: "auto", maxWidth: "100%" }}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedLeaves && displayedLeaves.length > 0 ? (
              displayedLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.department}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>
                    {new Date(leave.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(leave.endDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No employees on leave today
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
