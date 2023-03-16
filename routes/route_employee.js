//--LIBRERIAS--
const routes_employee = require('express').Router();

//--DEPENDENCIAS--
const {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee_controller");

//--RUTAS--
routes_employee.get("/",getAllEmployees);
routes_employee.get("/:eid",getEmployeesById);
routes_employee.post("/",createEmployee);
routes_employee.put("/:eid",updateEmployee);
routes_employee.delete("/:eid",deleteEmployee);

module.exports = routes_employee;
