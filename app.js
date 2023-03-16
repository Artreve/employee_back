// --LIBRERIAS--
const express = require("express");

// --DEPENDENCIAS--
const routes = require("./routes/")
const HttpError = require("./models/error");

const app = express();

//--MIDELWARE--
app.use(express.json({ limit: "50mb" }));

//--RUTAS--
app.use("/api", routes);

//--ERRORES--
app.use((req, res, next) => {
  const error = new HttpError("No se encontro esta ruta", 404);
  throw next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSet) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "A ocurrido un error inesperado" });
});

//--INICIAR SERVIDOR EXPRESS--
app.listen(3000, () => {
  console.log("Server iniciado");
});
