"use client";

import { gql, useQuery } from "@apollo/client";
import type { Leave } from "./type";

// Define query documents
export const EMPLOYEES_ON_LEAVE_BY_DEPARTMENT = gql`
  query EmployeesOnLeaveByDepartment($department: String!) {
    allEmployeesOnLeaveTodays(filter: { department: $department }) {
      id
      name
      department
      position
      dateOfBirth
      type
      startDate
      endDate
    }
  }
`;

export function useEmployeesOnLeaveByDepartment(department: string) {
  return useQuery<{ allEmployeesOnLeaveTodays: Leave[] }>(
    EMPLOYEES_ON_LEAVE_BY_DEPARTMENT,
    { 
      variables: { department }, 
      skip: !department || department === "all" 
    }
  );
}
