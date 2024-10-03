import { EmployeeType } from "../Types/employee_types.ts";
import { Employee } from "../model/employee.model.ts";
import { generateEncryptedPassword } from "../Utility/employee_utility.ts";
import { generateOtp, sendMail } from "../Utility/email_utility.ts";
import { redisClient } from "../Utility/redisClient.ts";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../Utility/token_utility.ts";
redisClient.connect();

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

export const sendOTP = async (userEmail: string) => {
  try {
    const otp = generateOtp();
    await redisClient.del(userEmail);
    await redisClient.set(userEmail, otp);
    const option = {
      to: userEmail,
      subject: "OTP for forgget password",
      message: `your otp is <strong>${otp}</strong>`,
    };
    let response = {
      message: `Something went wrong`,
      status: 500,
    };
    await sendMail(option)  
      .then((res) => {
        response = {
          message: "OTP sent successfully",
          status: 200,
        };
        setTimeout(async() => {
          await redisClient.del(userEmail);
          console.log("OTP deleted after 1 minute")
        },60000);
      })
      .catch((err) => {
        throw err;
      });
    return response;
  } catch (err) {
    throw err;
  }
};

export const otpVerification = async (email: string, otp: string) => {
  try {
    const actualOTP = await redisClient.get(email);
    if (actualOTP == otp) {
      await redisClient.del(email);
      const employee = await Employee.findOne({ email: email });
      if (!employee) {
        return {
          message: "Employee not found",
          status: 404,
        };
      }
      const refreshToken = await generateRefreshToken(employee.id);
      const accessToken = await generateAccessToken(employee.id);
      return {
        message: "otp verified successfully",
        status: 200,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } else {
      return { message: "Invalid OTP", status: 401 };
    }
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const id = await redisClient.get(token);
    const employee = await Employee.findById(id);
    if (!employee) {
      return {
        message: "Employee not found",
        status: 404,
      };
    }
    let encryptedPass = await generateEncryptedPassword(password);
    employee.password = encryptedPass;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee);
    return {
      status: 200,
      message: "Password updated successfully",
    };
  } catch (err) {
    throw err;
  }
};
