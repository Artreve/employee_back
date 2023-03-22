const conection = require("../database/dbConfig");
const model = require("./asset");

//--FILTRAO GENERAL--
const getAllEmployeesModel = async (values) => {
  const { first_name, last_name, team_id, page = 1, pageSize = 5 } = values;
  const filters = [];
  const valueSql = [];
  let query = "SELECT * FROM employee";
  let limitQuery = ` LIMIT ${(page - 1) * pageSize}, ${pageSize}`;
  if (first_name) {
    filters.push("first_name LIKE ?");
    valueSql.push(`%${first_name}%`);
  }
  if (last_name) {
    filters.push("last_name LIKE ?");
    valueSql.push(`%${last_name}%`);
  }
  if (team_id) {
    filters.push("team_id LIKE ?");
    valueSql.push(`%${team_id}%`);
  }
  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  query += limitQuery;
  const rows = await conection.query(query, valueSql).spread((rows) => rows);
  //Contar la cantidad de paginas.
  const [totalRows] = await conection.query(
    "SELECT COUNT (*) AS total FROM employee"
  );
  const total = totalRows[0].total;
  const pages = Math.ceil(total / pageSize);
  console.log(pages);
  return {num_pages: pages, rows};
};

//--TRAER EMPLEADO POR SU ID--
const getEmployeeByIdModel = async (id) => {
  const row = await conection
    .query("SELECT * FROM employee WHERE idemployee = ?", [id])
    .spread((row) => row);
  return row.length > 0 ? row[0] : null;
};

//--CREAR EMPLEADO--
const createEmployeeModel = async (values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const result = await conection
    .query(
      "INSERT INTO employee(first_name, last_name, cuit, team_id,join_date,rol) values(?,?,?,?,?,?)",
      [first_name, last_name, cuit, team_id, join_date, rol]
    )
    .spread((result) => result);
  return result;
};

//--ACTUALIZAR EMPLEADO--

//de la busqueda que realice en el controller, debo ingresarlo aqui
//user: valores viejos y values: valores nuevos
const updateEmployeeModel = async (user, values) => {
  const { first_name, last_name, cuit, team_id, join_date, rol } = values;
  const sql = `UPDATE employee SET first_name=?, last_name=?, cuit=?, team_id=?, join_date=?, rol=? WHERE idemployee=${user.idemployee}`;
  const result = await conection
    .query(sql, [
      first_name ? first_name : user.first_name,
      last_name ? last_name : user.last_name,
      cuit ? cuit : user.cuit,
      team_id ? team_id : user.team_id,
      join_date ? join_date : user.join_date,
      rol ? rol : user.rol,
    ])
    .spread((result) => result);

  return result;
};

//--ELIMINAR EMPLEADO--
const deleteEmployeeModel = async (id) => {
  const asset = model.getAssetByEmployeeIdModel(id);
  //Si el empleado no tiene assets entonces elimina al empleado
  //En caso de tener  primero debemos sacar la referencia de asset con employee
  //para eso realizaremos primero un update de los asset y luego eliminaremos al empleado
  if(!asset){
    await conection
      .query("DELETE FROM employee WHERE IDEMPLOYEE = ?", [id])
      .spread((result) => result);
  }else{
    await conection.query("UPDATE asset SET employeeid = NULL WHERE employeeid = ?",[id])
    await conection
      .query("DELETE FROM employee WHERE IDEMPLOYEE = ?", [id])
      .spread((result) => result);
  }

  // await conection
  //   .query("DELETE FROM employee WHERE IDEMPLOYEE = ?", [id])
  //   .spread((result) => result);
};

module.exports = {
  getAllEmployeesModel,
  getEmployeeByIdModel,
  createEmployeeModel,
  updateEmployeeModel,
  deleteEmployeeModel,
};
