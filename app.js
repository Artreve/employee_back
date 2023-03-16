// --LIBRERIAS--
const express = require("express");
const {errorHandlerMiddleware } = require("./middleware/error");

// --DEPENDENCIAS--
const routes = require("./routes/")

const app = express();

//--MIDELWARE--
app.use(express.json({ limit: "50mb" }));

//--RUTAS--
app.use("/api", routes);

//--ERRORES--
app.use(errorHandlerMiddleware);

//--INICIAR SERVIDOR EXPRESS--
app.listen(3000, () => {
  console.log("Server iniciado");
});
