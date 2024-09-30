import { EmployeeType, EmployeePost } from "../Types/employee_types.ts";
export declare const getAllEmployees: () => Promise<{
    employees: (import("mongoose").Document<unknown, {}, import("../model/employee.model.ts").IEmployee> & import("../model/employee.model.ts").IEmployee & {
        _id: import("mongoose").Types.ObjectId;
    })[];
    status: number;
}>;
export declare const getEmployeeById: (id: string) => Promise<{
    employee: (import("mongoose").Document<unknown, {}, import("../model/employee.model.ts").IEmployee> & import("../model/employee.model.ts").IEmployee & {
        _id: import("mongoose").Types.ObjectId;
    }) | null;
    status: number;
}>;
export declare const createEmployee: (employee: EmployeeType) => Promise<{
    message: string;
    status: number;
    employee?: undefined;
} | {
    message: string;
    employee: EmployeeType;
    status: number;
}>;
export declare const modifyEmployee: (employee: EmployeePost) => Promise<{
    message: string;
    status: number;
    employee?: undefined;
} | {
    employee: (import("mongoose").Document<unknown, {}, import("../model/employee.model.ts").IEmployee> & import("../model/employee.model.ts").IEmployee & {
        _id: import("mongoose").Types.ObjectId;
    }) | null;
    status: number;
    message?: undefined;
}>;
export declare const removeEmployee: (id: string) => Promise<{
    message: string;
    status: number;
}>;
