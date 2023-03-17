const model = require("../models/employee");
const {validationResult} = require("express-validator")

// const {validarSolicitud} = require("../middleware/validarEmployee")
const NotFoundError = require("../errors/NotFoundError")


//--FILTRAO GENERAL--
const getAllEmployees = async (req, res, next) => {
  const values = req.query;
  const empleados = await model.getAllEmployeesModel(values);

  res.json({ data: empleados });
};

//--TRAER EMPLEADO POR SU ID--
const getEmployeesById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await model.getEmployeeByIdModel(userId);
    if (!user) throw new NotFoundError('El empleado no existe') ; //validacion
    res.json({ menssage: user });
  } catch (error) {
    next(error)
  }
};

//--CREAR EMPLEADO--
const createEmployee = async (req, res) => {

  //Validacion de resultados de express validator: Me surgian muchos errores mandando a un archivo aparte
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const values = {...req.body}; //--Traemos valores del cuerpo
    const result = await model.createEmployeeModel(values);
    res.json({ data: result, messaje: "Usuario Creado" });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ACTUALIZAR EMPLEADO--
const updateEmployee = async (req, res, next) => {

  //Validacion de resultados de express validator: Me surgian muchos errores mandando a un archivo aparte
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const user = await model.getEmployeeByIdModel(userId); //valores viejos del usuario
    if (!user) throw new NotFoundError('El empleado no existe'); //validacion
    const values = {...req.body}; //valores nuevos del empleado
    const result = await model.updateEmployeeModel(user,values)
    res.json({result, messaje: `El usuario con el id ${userId} se actualizó exitosamente`})
  } catch (error) {
    console.log(error)
    next(error);
  }
};

//--ELIMINAR EMPLEADO--
const deleteEmployee = async (req, res,next) => {
  try {
    const userId = req.params.id;
    const user = await model.getEmployeeByIdModel(userId);
    console.log(user)
    if (!user) throw new NotFoundError('El empleado no existe');
    await model.deleteEmployeeModel(userId);
    res.json({ messaje: `Usuario con el Id: ${userId} eliminado` });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
