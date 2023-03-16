const asset_router = require("express").Router();

const {
  getAllAssets,
  getAssetById,
  getAssetByEmployeeId,
  createAsset,
  updateAsset,
  deleteAseet,
} = require("../controllers/asset_controller");

//--RUTAS ASSET--
asset_router.get("/", getAllAssets);
asset_router.get("/:aid", getAssetById);
asset_router.get("/employee/:eid", getAssetByEmployeeId)
asset_router.post("/", createAsset);
asset_router.put("/:aid", updateAsset);
asset_router.delete("/:aid", deleteAseet);

module.exports = asset_router;
