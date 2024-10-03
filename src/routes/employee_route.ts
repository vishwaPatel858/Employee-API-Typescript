import express from "express";
export const router = express.Router();
export const redisRefreshTokenRouter = express.Router();
const {
  employeeSchema,
  passwordSchema,
} = require("../validations/employee_validations.ts");
const {
  validate,
  validatePasswords,
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
} = require("../controllers/employee_controller.ts");

router.get("/", getEmployees);
router.get("/:id", employeeById);
router.post("/", validate(employeeSchema), addEmployee);
router.put("/:id", validate(employeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/forgetpassword", forgetPassword);
router.post("/verifyotp", verifyOTP);
router.post("/resetpassword", validatePasswords(passwordSchema), resetPass);
