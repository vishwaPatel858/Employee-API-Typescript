import { EmployeeType } from "../Types/employee_types.ts";
import { Request, Response } from "express";
import { Employee } from "../model/employee.model.ts";
import multer from "multer";
import path from "path";
import {
  generateEncryptedPassword,
  validatePassword,
} from "../Utility/employee_utility.ts";
import { generateOtp, sendMail } from "../Utility/email_utility.ts";
import { redisClient } from "../Utility/redisClient.ts";
import {
  verifyTokenData,
  generateAccessToken,
  generateRefreshToken,
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
      subject: "Forget Password",
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
        setTimeout(async () => {
          await redisClient.del(userEmail);
          console.log("OTP deleted after 1 minute");
        }, 60000);
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
      const accessToken = await generateAccessToken(employee.id);
      return {
        message: "otp verified successfully",
        status: 200,
        access_token: accessToken,
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
    const secretKey = process.env.JWT_Access_SECRET || "dev-ipqn463hzjuhm4wx";
    const Res = verifyTokenData(token, secretKey)
      .then(async (response) => {
        const id = response.id;
        const employee = await Employee.findById(id);
        if (!employee) {
          return {
            message: "Employee not found",
            status: 404,
          };
        }
        employee.password = await generateEncryptedPassword(password);
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employee);
        return {
          status: 200,
          message: "Password updated successfully",
        };
      })
      .catch((err) => {
        return {
          message: err.message,
          status: 500,
        };
      });
    return Res;
  } catch (err) {
    throw err;
  }
};

export const loginService = async (id: string, password: string) => {
  try {
    const emp = await Employee.findById(id);
    if (!emp) {
      return {
        message: "Employee not found",
        status: 404,
      };
    }
    const isValidPas = await validatePassword(password, emp.password);
    if (!isValidPas) {
      return {
        message: "Invalid password",
        status: 401,
      };
    }
    const access_token = await generateAccessToken(id);
    const refresh_token = await generateRefreshToken(id);
    return {
      message: "Login successful",
      status: 200,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  } catch (err) {
    throw err;
  }
};

export const logoutService = async (token: string) => {
  try {
    const deletedToken = await redisClient.del(token);
    if (deletedToken == 1) {
      return {
        message: "Logout successful",
        status: 200,
      };
    } else {
      return {
        message: "Error while logging out",
        status: 500,
      };
    }
  } catch (err) {
    throw err;
  }
};
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).single("file");

const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).array("files");

const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images only! (jpeg, jpg, png, gif)"));
  }
};

export const FileUpload = (req: Request, res: Response) => {
  return upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File Not Found" });
    }
    res.status(200).json({ message: "File uploaded!" });
  });
};

export const FileUploadMultiple = (req: Request, res: Response) => {
  return uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!req.files) {
      return res.status(400).json({ error: "File Not Found" });
    }else{
      res.status(200).json({ message: "File uploaded!" });
    }
  });
};
