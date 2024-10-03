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
    const {token,password} = req.body;
    resetPassword(token,password).then((response) => {
      res.status(response.status).json(response);
    }).catch((err) => {
      res.status(500).json({ message: err.message });
    });  

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    res.status(500).json({ message: message });
  }
};
