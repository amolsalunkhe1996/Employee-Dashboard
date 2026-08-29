export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

export type EmployeePayload = Omit<Employee, 'id'>;