import Joi from "joi";
import { Request, Response, NextFunction, response } from "express";
import { EmployeeType, ResetPass } from "../Types/employee_types.ts";
import { redisClient } from "../Utility/redisClient.ts";
import { verifyTokenData } from "../Utility/token_utility.ts";
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
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
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
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const verifyToken = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;
      const id = await redisClient.get(token);
      req.params.id = id;
      if (!id) {
        res.status(401).json({ message: "Unauthorized access" });
      }
      const secretKey = process.env.JWT_Access_SECRET || "dev-ipqn463hzjuhm4wx";
      const isValidToken = await verifyTokenData(token, secretKey)
        .then((response) => {
          console.log(response);
          next();
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error.";
      res.status(500).json({ message: message });
    }
  };
};
