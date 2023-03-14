//--LIBRERIAS--
const express = require("express");
const router = express.Router();

//--DEPENDENCIAS--
const {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee_controller");

//--RUTAS--
router.get("/",getAllEmployees);
router.get("/:eid",getEmployeesById);
router.post("/",createEmployee);
router.patch("/:eid",updateEmployee);
router.delete("/:eid",deleteEmployee);

module.exports = router;
