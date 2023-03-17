const conection = require("../database/dbConfig");
const model = require('./asset')

//--FILTRAO GENERAL--
const getAllEmployeesModel = (values) => {
  const {first_name, last_name, team_id, page = 1, pageSize = 5} = values;
  const filters = [];
  const valueSql = [];
  let query = 'SELECT * FROM employee';
  let limitQuery = ` LIMIT ${(page - 1) * pageSize}, ${pageSize}`;
  if (first_name){
    filters.push('first_name LIKE ?')
    valueSql.push(`%${first_name}%`)
  }
  if (last_name){
    filters.push('last_name LIKE ?')
    valueSql.push(`%${last_name}%`)
  }
  if (team_id){
    filters.push('team_id LIKE ?')
    valueSql.push(`%${team_id}%`)
  }
  if (filters.length > 0) {
    query += ' WHERE ' + filters.join(' AND ');
  }

  query += limitQuery;
  const rows = conection.query(query,valueSql).spread(rows =>  rows)
  return rows
};

//--TRAER EMPLEADO POR SU ID--
const getEmployeeByIdModel = async (id) => {
  const row = await conection
    .query("SELECT * FROM employee WHERE idemployee = ?", [id])
    .spread((row) => row);
  return row.length>0 ?row [0]: null;
};

//--CREAR EMPLEADO--
const createEmployeeModel = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await conection.query("INSERT INTO employee(first_name, last_name, cuit, team_id,join_date,rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]).spread((result) => result);
    return result
};

//--ACTUALIZAR EMPLEADO--

//de la busqueda que realice en el controller, debo ingresarlo aqui
//user: valores viejos y values: valores nuevos
const updateEmployeeModel = async (user, values) => {
  const {first_name, last_name, cuit, team_id, join_date, rol} = values;
  const sql = `UPDATE employee SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE idemployee=${user.idemployee}`;
  const result = await conection.query(sql,[
    first_name ? first_name:user.first_name, 
    last_name ? last_name:user.last_name, 
    cuit  ? cuit:user.cuit, 
    team_id ? team_id:user.team_id, 
    join_date ? join_date:user.join_date, 
    rol ? rol:user.rol
  ]).spread((result) =>result);

  return result
};

//--ELIMINAR EMPLEADO--
const deleteEmployeeModel = async (id) => {
  const asset = model.getEmployeeByIdModel(id)
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
