// --LIBRERIAS--
const express = require("express");
const {errorHandlerMiddleware } = require("./middleware/error");

// --DEPENDENCIAS--
const routes = require("./routes/")

const app = express();

//--MIDELWARE--
app.use(express.json({ limit: "50mb" }));

//--VALIDACION DE CORDS--
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

//--RUTAS--
app.use("/api", routes);

//--ERRORES--
app.use(errorHandlerMiddleware);

//--INICIAR SERVIDOR EXPRESS--
app.listen(5000, () => {
  console.log("Server iniciado");
});
