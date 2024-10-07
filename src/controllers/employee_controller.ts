import { Request, Response } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  modifyEmployee,
  removeEmployee,
  sendOTP,
  otpVerification,
  resetPassword,
  loginService,
  logoutService,
  FileUpload,
  FileUploadMultiple,
} from "../services/employee_services.ts";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    getAllEmployees()
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const employeeById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    getEmployeeById(id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  try {
    createEmployee(req.body)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    modifyEmployee(req.body, req.params.id)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    removeEmployee(id)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    sendOTP(email)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    otpVerification(email, otp)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const resetPass = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    resetPassword(token, password)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const login = (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    loginService(id, password)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    logoutService(token)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const fileUpload = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(404).json({ message: "File not found." });
    } else {
      res.status(200).json({ message: "File successfully uploaded." });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const fileUploadMultiple = (req: Request, res: Response) => {
  try {
    if (!req.files) {
      res.status(404).json({ message: "File not found." });
    } else {
      res.status(200).json({ message: "Files uploaded Successfully." });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};

export const fileUploadWithValidations = (req: Request, res: Response) => {
  return FileUpload(req, res);
};
export const fileUploadWithValidationsMutiple = (req: Request, res: Response) => {
  return FileUploadMultiple(req, res);
};
