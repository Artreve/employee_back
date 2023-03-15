const conection = require("../database/dbConfig");

//--FILTRAO GENERAL--
const getAllAssetsModel = async () => {
  const rows = await conection
    .query("SELECT * FROM asset")
    .spread((rows) => rows);
  return rows;
};
const getAssetByEmployeeIdModel = async () =>{

}

//--TRAER EMPLEADO POR SU ID--
const getAssetByIdModel = async (id) => {
  const row = await conection
    .query("SELECT * FROM asset WHERE idasset = ?", [id])
    .spread((row) => row);
  return row;
};

//--CREAR EMPLEADO--
const createAssetModel = async (values) => {
  const { name, type, code, marca, description, purchase_date } = values;
  console.log(values)
  const result = await conection.query("INSERT INTO asset(name, type, code, marca,desciption,purchase_date) values(?,?,?,?,?,?)",
      [name, type, code, marca, description, purchase_date]).spread((result) => result);
    return result
};

//--ACTUALIZAR EMPLEADO--
const updateAssetModel = async (id, values) => {
  const {name, type, code, marca, description, purchase_date} = values;
  const sql = `UPDATE asset SET name=?, type=?, code=?, marca=?, description=?, purchase_date=? WHERE idasset=${id}`;
  const result = await conection.query(sql,[name, type, code, marca, description, purchase_date]).spread((result) =>result);
  return result
};

//--ELIMINAR EMPLEADO--
const deleteAssetModel = async (id) => {
  await conection
    .query("DELETE FROM asset WHERE idasset = ?", [id])
    .spread((result) => result);
};

module.exports = {
  getAllAssetsModel,
  getAssetByEmployeeIdModel,
  getAssetByIdModel,
  createAssetModel,
  updateAssetModel,
  deleteAssetModel,
};