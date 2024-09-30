import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { EmployeeType } from "../Types/employee_types.ts";

export const validate =  (schema: Joi.Schema) => {
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
