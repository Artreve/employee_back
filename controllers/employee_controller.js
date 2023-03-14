const model = require("../models/employee");
const HttpError = require("../models/error");

const getAllEmployees = async (req, res, next) => {
  const empleados = await model.getAllEmployeesModel();

  res.json({ data: empleados });
};
const getEmployeesById = async (req, res, next) => {};
const createEmployee = async (req, res, next) => {
  try {
    const values = { ...req.body }; //--Traemos valores del cuerpo
    await model.createEmployeeModel(values);
    res.json({ messaje: "Usuario Creado" });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};
const updateEmployee = async (req, res, next) => {};
const deleteEmployee = async (req, res, next) => {
  try {
    const userId = req.params.eid;
    await model.deleteEmployeeModel(userId);
    res.json({ messaje: `Usuario con el Id: ${userId} eliminado` });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};
module.exports = {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
