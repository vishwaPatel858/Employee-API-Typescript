import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export declare const validate: (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateId: (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
