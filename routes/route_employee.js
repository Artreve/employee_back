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
const {validar_employee, validar_update} = require('../middleware/validarEmployee')

//--RUTAS--
routes_employee.get("/",getAllEmployees);
routes_employee.get("/:id",getEmployeesById);
routes_employee.post("/",validar_employee,createEmployee);
routes_employee.put("/:id",validar_update,updateEmployee);
routes_employee.delete("/:id",deleteEmployee);

module.exports = routes_employee;
