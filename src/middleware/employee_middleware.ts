import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { EmployeeType, ResetPass } from "../Types/employee_types.ts";

export const validate = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeSchemaValidation: EmployeeType = await schema.validateAsync(
        req.body
      );
      req.body = EmployeeSchemaValidation;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(400).json({ message: err.message });
      }
      throw err;
    }
  };
};

export const validatePasswords = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resetPassip: ResetPass = req.body;
      if (resetPassip.password != resetPassip.reentered_password) {
        res.status(400).json({ message: "Passwords do not match" });
      } else {
        const isValidPass = await schema.validateAsync({
          password: resetPassip.password,
        });
        req.body = resetPassip;
        next();
      }
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(400).json({ message: err.message });
      }
      throw err;
    }
  };
};
