import express from "express";
export const router = express.Router();
export const redisRefreshTokenRouter = express.Router();
const { employeeSchema } = require("../validations/employee_validations.ts");
const { validate } = require("../middleware/employee_middleware.ts");
const {
  getEmployees,
  employeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee_controller.ts");

router.get("/", getEmployees);
router.get("/:id", employeeById);
router.post("/", validate(employeeSchema), addEmployee);
router.put("/:id", validate(employeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);
