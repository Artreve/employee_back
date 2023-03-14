const dataBase = require("mysql2-promise")();
const dotEnv = require("dotenv");
dotEnv.config();

//--CONEXION CON SQL--
const connection = ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

dataBase.configure(connection);

module.exports = dataBase;
