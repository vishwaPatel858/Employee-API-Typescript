import express from "express";
export const router = express.Router();
export const redisRefreshTokenRouter = express.Router();
const {
  employeeSchema,
  passwordSchema,
  tokenSchema
} = require("../validations/employee_validations.ts");
const {
  validate,
  validatePasswords,
  verifyToken,
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
} = require("../controllers/employee_controller.ts");

router.get("/", getEmployees);
router.get("/:id", employeeById);
router.post("/", validate(employeeSchema), addEmployee);
router.put("/:id", validate(employeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resetpassword", validatePasswords(passwordSchema), resetPass);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile", verifyToken(tokenSchema), employeeById);
