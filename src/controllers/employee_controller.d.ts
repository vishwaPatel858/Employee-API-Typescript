import { Response } from "express";
import { EmployeeType, EmployeePost } from "../Types/employee_types.ts";
export declare const getEmployees: (req: Request, res: Response) => Promise<void>;
export declare const employeeById: (req: string, res: Response) => void;
export declare const addEmployee: (req: EmployeeType, res: Response) => Promise<void>;
export declare const updateEmployee: (req: EmployeePost, res: Response) => Promise<void>;
export declare const deleteEmployee: (req: string, res: Response) => Promise<void>;
