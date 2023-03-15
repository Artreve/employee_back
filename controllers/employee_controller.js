const model = require("../models/asset");
const HttpError = require("../models/error");

//--FILTRAO GENERAL--
const getAllAssets = async (req, res) => {
  const empleados = await model.getAllAssetsModel();

  res.json({ data: empleados });
};

const getAssetByEmployeeId = async (req, res) => {
  const assets = await model.getAssetByEmployeeIdModel();
};

//--TRAER EMPLEADO POR SU ID--
const getAssetsById = async (req, res, next) => {
  try {
    const userId = req.params.eid;
    const user = await model.getAssetByIdModel(userId);
    res.json({ menssage: user });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--CREAR EMPLEADO--
const createAsset = async (req, res) => {
  try {
    const values = { ...req.body }; //--Traemos valores del cuerpo
    const result = await model.createAssetModel(values);
    res.json({ data: result, messaje: "Usuario Creado" });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ACTUALIZAR EMPLEADO--
const updateAsset = async (req, res) => {
  try {
    const userId = req.params.eid;
    const values = { ...req.body };
    const result = await model.updateAssetModel(userId, values);
    res.json({
      result,
      messaje: `El usuario con el id ${userId} se actualizó exitosamente`,
    });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ELIMINAR EMPLEADO--
const deleteAsset = async (req, res) => {
  try {
    const userId = req.params.eid;
    await model.deleteAssetModel(userId);
    res.json({ messaje: `Usuario con el Id: ${userId} eliminado` });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};
module.exports = {
  getAllAssets,
  getAssetsById,
  getAssetByEmployeeId,
  createAsset,
  updateAsset,
  deleteAsset,
};
