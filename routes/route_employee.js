//--LIBRERIAS--
const router = require('express').Router();

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
router.put("/:eid",updateEmployee);
router.delete("/:eid",deleteEmployee);

module.exports = router;
