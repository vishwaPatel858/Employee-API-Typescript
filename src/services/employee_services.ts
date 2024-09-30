import { EmployeeType } from "../Types/employee_types.ts";
import { Employee } from "../model/employee.model.ts";
import { generateEncryptedPassword } from "../Utility/employee_utility.ts";

export const getAllEmployees = async () => {
  try {
    const employees = await Employee.find({});
    return {
      employees: employees,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return {
        message: "Employee not found",
        status: 404,
      };
    }
    return {
      employee: employee,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};
export const createEmployee = async (employee: EmployeeType) => {
  try {
    const emailExists = await Employee.findOne({ email: employee.email });
    if (emailExists) {
      return {
        message: "Email already exists",
        status: 400,
      };
    }
    const encryptedPass = await generateEncryptedPassword(employee.password);
    employee.password = encryptedPass;
    const newEmp: EmployeeType = await Employee.create(employee);
    return {
      message: "employee created Successfully!",
      employee: newEmp,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const modifyEmployee = async (employee: EmployeeType, id: string) => {
  try {
    const isEmailExists = await Employee.findOne({
      email: employee.email,
      _id: { $ne: id },
    });
    if (isEmailExists) {
      return {
        message: "Email Already Exists.",
        status: 400,
      };
    }
    const encryptedPass = await generateEncryptedPassword(employee.password);
    employee.password = encryptedPass;
    const newEmp = await Employee.findByIdAndUpdate(id, employee);
    if (!newEmp) {
      return {
        message: "Employee Not Found",
        status: 404,
      };
    }
    const updatedEmp = await Employee.findById(id);
    return {
      message: "Employee Updated Successfully",
      employee: updatedEmp,
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};

export const removeEmployee = async (id: string) => {
  try {
    const isDeleted = await Employee.findByIdAndDelete(id);
    if (isDeleted) {
      return {
        message: "Employee Deleted Successfully",
        status: 200,
      };
    } else {
      return {
        message: "Employee Not Found.",
        status: 400,
      };
    }
  } catch (err) {
    throw err;
  }
};
