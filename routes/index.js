const rootRouter = require("express").Router();
const routes_employee = require("./route_employee");
const routes_asset = require("./route_asset");

//--RUTAS--
rootRouter.use("/employee", routes_employee);
rootRouter.use("/asset", routes_asset);

module.exports = rootRouter;
