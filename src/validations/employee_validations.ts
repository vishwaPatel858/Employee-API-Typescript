import Joi from "joi";
export const employeeSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[A-Za-z]+( [A-Za-z]+)*$/))
    .required()
    .messages({
      "string.empty": "Name cannot be empty.",
      "string.pattern.base":
        "name cannot contain numbers , special characters and multiple spaces.",
    }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty.",
      "string.pattern.base":
        "Password must contain 1 Uppercase letter , 1 lowercase letter , 1 digit and 1 special character.Password length must be minimum 8 and maximum 10 characters.",
    }),
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
      )
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty.",
      "string.pattern.base":
        "Password must contain 1 Uppercase letter , 1 lowercase letter , 1 digit and 1 special character.Password length must be minimum 8 and maximum 10 characters.",
    }),
});

export const tokenSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required.",
  }),
});
