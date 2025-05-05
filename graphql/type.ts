export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  dateOfBirth: string;
  isActive: boolean;
}

export interface Leave {
  id: string;
  name: string;
  department: string;
  position: string;
  dateOfBirth: string;
  type: string;
  startDate: string;
  endDate: string;
  status?: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface TeamStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  departments: Department[]
} 