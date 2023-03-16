const asset_router = require("express").Router();

const {
  getAllAssets,
  getAssetById,
  getAssetByEmployeeId,
  createAsset,
  updateAsset,
  deleteAseet,
} = require("../controllers/asset_controller");
const validar_asset = require("../middleware/validarAsset");

//--RUTAS ASSET--
asset_router.get("/", getAllAssets);
asset_router.get("/:id", getAssetById);
asset_router.get("/employee/:id", getAssetByEmployeeId)
asset_router.post("/",validar_asset, createAsset);
asset_router.put("/:id", updateAsset);
asset_router.delete("/:id", deleteAseet);

module.exports = asset_router;
