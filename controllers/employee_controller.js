const model = require("../models/employee");
const HttpError = require("../models/error");

//--FILTRAO GENERAL--
const getAllEmployees = async (req, res, next) => {
  const empleados = await model.getAllEmployeesModel();

  res.json({ data: empleados });
};

//--TRAER EMPLEADO POR SU ID--
const getEmployeesById = async (req, res, next) => {
  try {
    const userId = req.params.eid;
    const user = await model.getEmployeeByIdModel(userId);
    res.json({ menssage: user });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--CREAR EMPLEADO--
const createEmployee = async (req, res) => {
  try {
    const values = {...req.body}; //--Traemos valores del cuerpo
    const result = await model.createEmployeeModel(values);
    res.json({ data: result, messaje: "Usuario Creado" });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ACTUALIZAR EMPLEADO--
const updateEmployee = async (req, res) => {
  try {
    const userId = req.params.eid;
    const values = {...req.body};
    const result = await model.updateEmployeeModel(userId,values)
    res.json({result, messaje: `El usuario con el id ${userId} se actualizó exitosamente`})
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ELIMINAR EMPLEADO--
const deleteEmployee = async (req, res) => {
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
