const model = require("../models/asset");
const {validationResult} = require("express-validator")

const NotFoundError = require("../errors/NotFoundError");

//--FILTRAO GENERAL--
const getAllAssets = async (req, res) => {
  const assets = await model.getAllAssetsModel();

  res.json({ data: assets });
};

const getAssetByEmployeeId = async (req, res, next) => {
  try {
  const userId = req.params.id;
  const assets = await model.getAssetByEmployeeIdModel(userId);
  if (!assets) throw new NotFoundError("No hay articulos asignados a este empleado")
  res.json({ data: assets });
  } catch (error) {
    next(error)
  }
  
};

//--TRAER ASSET POR SU ID--
const getAssetById = async (req, res, next) => {
  try {
    const assetId = req.params.aid;
    const asset = await model.getAssetByIdModel(assetId);
    if (!asset) throw new NotFoundError("El Articulo no existe");
    res.json({ data: asset });
  } catch (error) {
    next(error);
  }
};

//--CREAR ASSET--
const createAsset = async (req, res) => {
  //Validacion de resultados de express validator: Me surgian muchos errores mandando a un archivo aparte
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const values = { ...req.body }; //--Traemos valores del cuerpo
    const result = await model.createAssetModel(values);
    res.json({ data: result, messaje: "Asset Creado" });
  } catch (error) {
    next(error);
  }
};

//--ACTUALIZAR EMPLEADO--
const updateAsset = async (req, res,next) => {
  try {
    const assetId = req.params.id;
    const asset = await model.getAssetByIdModel(assetId);
    if (!asset) throw new NotFoundError("El Articulo no existe");
    const values = { ...req.body };
    const result = await model.updateAssetModel(asset, values);
    res.json({
      result,
      messaje: `El asset con el id ${assetId} se actualizó exitosamente`,
    });
  } catch (error) {
    next(error);
  }
};

//--ELIMINAR EMPLEADO--
const deleteAseet = async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const asset = await model.getAssetByIdModel(assetId);
    if (!asset) throw new NotFoundError("El Articulo no existe");
    await model.deleteAssetModel(assetId);
    res.json({ messaje: `Articulo con el Id: ${assetId} eliminado` });
  } catch (error) {
    next(error);
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
