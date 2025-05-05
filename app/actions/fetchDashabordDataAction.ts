'use server';

import type { TeamStats, Leave, Employee, Department } from "@/graphql/type";

interface DashboardData {
  TeamOverview: TeamStats;
  allBirthdaysThisWeeks: Employee[];
  allEmployeesOnLeaveTodays: Leave[];
  allDepartments: Department[];
}

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/';

// Server-side fetch function for GraphQL
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: 'no-store'
    });

    const result = await response.json() as GraphQLResponse<T>;

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const query = `
    query {
      TeamOverview(id:1) { 
        totalEmployees 
        activeEmployees 
        onLeaveEmployees 
        departments
      }
      allBirthdaysThisWeeks { 
        id 
        name 
        department 
        position
        dateOfBirth 
      }
      allEmployeesOnLeaveTodays { 
        id
        name
        position
        dateOfBirth
        department
        type
        startDate
        endDate
      }
      allDepartments {
        id
        name
      }
    }
  `;

  return fetchGraphQL<DashboardData>(query);
}