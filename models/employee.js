const conection = require("../database/dbConfig");

const getAllEmployeesModel = async () => {
  const rows = await conection.query("SELECT * FROM employee").spread((rows) => rows);
  return rows;
};

const createEmployeeModel = async (values) => {
  const { nombre, apellido, cuit, teamId, joinDate, rol } = values;
  await conection.query('INSERT INTO TO employee(first_name, last_name, cuit, team_id,join_date,rol values(?,?,?,?,?,?)',[nombre,apellido,cuit,teamId,joinDate,rol]).spread(result=> result)
};
const updateEmployeeModel = async () => {};
const deleteEmployeeModel = async (id) => {
 await conection.query('DELETE FROM employee WHERE IDEMPLOYEE = ?', [id]).spread(result=>result)
};

module.exports = {
  getAllEmployeesModel,
  createEmployeeModel,
  updateEmployeeModel,
  deleteEmployeeModel,
};
