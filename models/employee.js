const conection = require("../database/dbConfig");

//--FILTRAO GENERAL--
const getAllEmployeesModel = async () => {
  const rows = await conection
    .query("SELECT * FROM employee")
    .spread((rows) => rows);
  return rows;
};

//--TRAER EMPLEADO POR SU ID--
const getEmployeeByIdModel = async (id) => {
  const row = await conection
    .query("SELECT * FROM employee WHERE idemployee = ?", [id])
    .spread((row) => row);
  return row;
};

//--CREAR EMPLEADO--
const createEmployeeModel = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  console.log(values)
  const result = await conection.query("INSERT INTO employee(first_name, last_name, cuit, team_id,join_date,rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]).spread((result) => result);
    return result
};

//--ACTUALIZAR EMPLEADO--
const updateEmployeeModel = async (id, values) => {
  const {first_name, last_name, cuit, team_id, join_date, rol} = values;
  const sql = `UPDATE employee SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE idemployee=${id}`;
  const result = await conection.query(sql,[first_name, last_name, cuit, team_id, join_date, rol]).spread((result) =>result);
  return result
};

//--ELIMINAR EMPLEADO--
const deleteEmployeeModel = async (id) => {
  await conection
    .query("DELETE FROM employee WHERE IDEMPLOYEE = ?", [id])
    .spread((result) => result);
};

module.exports = {
  getAllEmployeesModel,
  getEmployeeByIdModel,
  createEmployeeModel,
  updateEmployeeModel,
  deleteEmployeeModel,
};
