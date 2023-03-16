const model = require("../models/asset");
const HttpError = require("../models/error");

//--FILTRAO GENERAL--
const getAllAssets = async (req, res) => {
  const assets = await model.getAllAssetsModel();

  res.json({ data: assets });
};

const getAssetByEmployeeId = async (req, res)=>{
  const assets = await model.getAssetByEmployeeIdModel();
  res.json({data:assets})
}

//--TRAER ASSET POR SU ID--
const getAssetById = async (req, res, next) => {
  try {
    const assetId = req.params.aid;
    const asset = await model.getAssetByIdModel(assetId);
    res.json({ data: asset });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--CREAR ASSET--
const createAsset = async (req, res) => {
  try {
    const values = {...req.body}; //--Traemos valores del cuerpo
    const result = await model.createAssetModel(values);
    res.json({ data: result, messaje: "Asset Creado" });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ACTUALIZAR EMPLEADO--
const updateAsset = async (req, res) => {
  try {
    const assetId = req.params.aid;
    const values = {...req.body};
    const result = await model.updateAssetModel(assetId,values)
    res.json({result, messaje: `El asset con el id ${assetId} se actualizó exitosamente`})
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};

//--ELIMINAR EMPLEADO--
const deleteAseet = async (req, res) => {
  try {
    const assetId = req.params.aid;
    await model.deleteAssetModel(assetId);
    res.json({ messaje: `Usuario con el Id: ${assetId} eliminado` });
  } catch (error) {
    new HttpError("Algo salio mal", 500);
  }
};
module.exports = {
  getAllAssets,
  getAssetById,
  getAssetByEmployeeId,
  createAsset,
  updateAsset,
  deleteAseet,
};