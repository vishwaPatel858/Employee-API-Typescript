import Joi from "joi";
import { Request, Response, NextFunction, response } from "express";
import { EmployeeType, ResetPass, Login } from "../Types/employee_types.ts";
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
      /*
      const resetPassip: ResetPass = req.body;
      if (resetPassip.password != resetPassip.reentered_password) {
        res.status(400).json({ message: "Passwords do not match" });
      } else {
        const isValidPass: ResetPass = await schema.validateAsync(req.body);
        req.body = isValidPass;
        next();
      }*/
      const resetPass: ResetPass = await schema.validateAsync(req.body);
      req.body = resetPass;
      if (resetPass.password != resetPass.reentered_password) {
        res.status(400).json({ message: "Passwords do not match" });
      } else {
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

export const validateLogin = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginValidation: Login = await schema.validateAsync(req.body);
      req.body = loginValidation;
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const validateEmail = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validateAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
      } else {
        const message = err instanceof Error ? err.message : "Unknown error.";
        res.status(500).json({ message: message });
      }
    }
  };
};

export const validateOTP = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validateAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        res.status(500).json({ message: err.message });
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
      const secretKey = process.env.JWT_Access_SECRET || "dev-ipqn463hzjuhm4wx";
      const isValidToken = await verifyTokenData(token, secretKey)
        .then((response) => {
          const id = response.id;
          req.params.id = id;
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
