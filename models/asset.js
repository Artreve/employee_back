const conection = require("../database/dbConfig");

//--FILTRAO GENERAL--
const getAllAssetsModel = async () => {
  const rows = await conection
    .query("SELECT * FROM asset")
    .spread((rows) => rows);
  return rows;
};
const getAssetByEmployeeIdModel = async (id) =>{
  const rows = await conection
  .query("SELECT * FROM asset WHERE employeeid = ?", [id])
  .spread((rows) => rows);
  return rows.length > 0 ? rows[0]:null;
}

//--TRAER ASSET POR SU ID--
const getAssetByIdModel = async (id) => {
  const row = await conection
    .query("SELECT * FROM asset WHERE idasset = ?", [id])
    .spread((row) => row);
  return row.length > 0 ? row[0]:null;
};

//--CREAR ASSET--
const createAssetModel = async (values) => {
  const { name, type, code, marca, description, purchase_date } = values;
  const result = await conection.query("INSERT INTO asset(name, type, code, marca,description,purchase_date) values(?,?,?,?,?,?)",
      [name, type, code, marca, description, purchase_date]).spread((result) => result);
    return result
};

//--ACTUALIZAR ASSET--
const updateAssetModel = async (asset, values) => {
  const {name, type, code, marca, description, purchase_date, employeeid} = values;
  console.log(employeeid)
  const sql = `UPDATE asset SET name=?, type=?, code=?, marca=?, description=?, purchase_date=?, employeeid = ? WHERE idasset=${asset.idasset}`;
  const result = await conection.query(sql,[
    name ? name : asset.name, 
    type ? type : asset.type, 
    code ? code : asset.code, 
    marca ? marca : asset.marca, 
    description ? description : asset.description, 
    purchase_date ? purchase_date : asset.purchase_date, 
    !employeeid || employeeid ? employeeid : asset.employeeid
  ]
  ).spread((result) =>result);
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