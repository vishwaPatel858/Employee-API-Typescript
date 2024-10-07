import express from "express";
export const router = express.Router();
export const redisRefreshTokenRouter = express.Router();
const {
  employeeSchema,
  passwordSchema,
  tokenSchema,
  loginSchema,
  emailSchema,
  verifyOTPSchema,
} = require("../validations/employee_validations.ts");
const {
  validate,
  validatePasswords,
  verifyToken,
  validateLogin,
  validateEmail,
  validateOTP,
  validateFileUpload,
} = require("../middleware/employee_middleware.ts");
const {
  getEmployees,
  employeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  forgetPassword,
  verifyOTP,
  resetPass,
  login,
  logout,
  fileUpload,
  fileUploadMultiple,
  fileUploadWithValidations,
  fileUploadWithValidationsMutiple,
} = require("../controllers/employee_controller.ts");

import multer from "multer";
const uploader = multer({ dest: "uploads/" });
router.get("/", getEmployees);
router.get("/:id", employeeById);
router.post("/", validate(employeeSchema), addEmployee);
router.put("/:id", validate(employeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/forgetpassword", validateEmail(emailSchema), forgetPassword);
router.post("/verifyotp", validateOTP(verifyOTPSchema), verifyOTP);
router.post("/resetpassword", validatePasswords(passwordSchema), resetPass);
router.post("/login", validateLogin(loginSchema), login);
router.post("/logout", verifyToken(tokenSchema), logout);
router.post("/profile", verifyToken(tokenSchema), employeeById);
router.post("/fileupload", uploader.single("file"), fileUpload);
router.post("/fileuploads", uploader.array("files"), fileUploadMultiple);
router.post("/upload", fileUploadWithValidations);
router.post("/uploads", fileUploadWithValidationsMutiple);
