# HRIS Dashboard Challenge

A modern HR Information System dashboard built with Next.js, React, Material UI, and GraphQL.

## Features

- **Next.js App Router Features**: Utilizing error.tsx and loading.tsx for robust error handling and loading states
- **Server-Side Fetching**: Initial data is fetched server-side for improved performance and SEO optimization
- **Employees on Leave Today**: View and filter employees currently on leave
- **Birthdays This Week**: Display employees celebrating birthdays in the current week
- **Team Overview**: Show aggregated statistics about employees and departments
- **Export Functionality**: Export employee data to CSV format
- **Department Filtering**: Filter employees by department using GraphQL queries

## Tech Stack

- **Frontend**:

  - Next.js 15 (App Router)
  - React 19
  - Material UI 7
  - TypeScript

- **API**:

  - GraphQL (using a hosted JSON GraphQL mock server)[https://hris-json-graphql-mock-server.vercel.app/](link)
  - Apollo Client for state management and data fetching

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd hris_dashboard
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser

## Mock GraphQL Server

The application fetches data from a hosted JSON GraphQL mock server at:

[https://hris-json-graphql-mock-server.vercel.app/](https://hris-json-graphql-mock-server.vercel.app/)

This server provides the following GraphQL endpoints:

- `allEmployeesOnLeaveTodays`
- `allBirthdaysThisWeeks`
- `TeamOverview`
- `allDepartments`

The mock server is based on json-graphql-server and provides realistic HR data for development and demonstration purposes.

## Project Structure

```
hris_dashboard/
├── app/                 # Next.js App Router
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard page
│   │   ├── error.tsx    # Error handling for dashboard
│   │   ├── loading.tsx  # Loading state for dashboard
│   │   └── page.tsx     # Dashboard page component
│   ├── providers.tsx    # Apollo Provider wrapper
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Root page
├── components/          # React components
│   ├── BirthdaysThisWeek.tsx
│   ├── EmployeesOnLeave.tsx
│   └── TeamOverview.tsx
├── graphql/             # GraphQL related files
│   ├── client.ts        # Apollo Client setup
│   ├── hooks.ts         # GraphQL query hooks
│   └── type.ts          # TypeScript interfaces
├── public/              # Static assets
└── utils/               # Utility functions
    ├── exportUtils.ts   # CSV export functionality
    └── theme.ts         # Material UI theme customization
```

## GraphQL Implementation

### Apollo Client Setup

The application uses Apollo Client for GraphQL data fetching with the following features:

- Client-side state management
- Error handling with error link
- Custom hook implementations for each query
- Type-safe GraphQL operations
- Hybrid fetching strategy (server + client)

### GraphQL Queries

Key queries implemented:

- `allEmployeesOnLeaveTodays`: Fetches employees currently on leave
- `allEmployeesOnLeaveTodays(filter: { department: $department })`: Filters by department
- `allBirthdaysThisWeeks`: Retrieves employees with birthdays in the current week
- `TeamOverview`: Gets team statistics

### Filter Implementation

The department filter demonstrates:

- Skip patterns to avoid unnecessary queries
- Client-side fallback filtering when appropriate
- Loading states during filtering operations

## Key Components

- **EmployeesOnLeave**: Displays and filters employees on leave
- **BirthdaysThisWeek**: Shows employee birthdays in the current week
- **TeamOverview**: Provides statistical overview of the team structure

## License

[MIT License](LICENSE)
