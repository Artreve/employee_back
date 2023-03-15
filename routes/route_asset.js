const router = require("express").Router();

const {
  getAllAssets,
  getAssetById,
  getAssetByEmployeeId,
  createAsset,
  updateAsset,
  deleteAseet,
} = require("../controllers/asset_controller");

//--RUTAS ASSET--
router.get("/", getAllAssets);
router.get("/:aid", getAssetById);
router.get("/employee/:eid", getAssetByEmployeeId)
router.post("/", createAsset);
router.put("/:aid", updateAsset);
router.delete("/:aid", deleteAseet);

module.exports = router;
