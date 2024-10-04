export interface EmployeeType {
  name: string;
  email: string;
  password: string;
}

export interface ResetPass {
  password: string;
  reentered_password: string;
  token: string;
}

export interface Login {
  id: string;
  password: string;
}
