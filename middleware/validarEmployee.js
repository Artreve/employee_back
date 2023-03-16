const { check,query, validationResult } = require("express-validator");
const validar_employee =
  [
    check("first_name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 20 }),
    check("last_name")
      .notEmpty()
      .withMessage("El apellido es obligatorio")
      .isLength({ min: 15 }),
    check("cuit")
      .notEmpty()
      .withMessage("El cuit es obligatorio")
      .isLength({ min: 11 }),
    check("team_id").notEmpty().withMessage("El id de equipo es obligatorio"),
    check("join_date").notEmpty().withMessage("la fecha es obligatorio"),
    check("rol").notEmpty().withMessage("El rol es obligatorio"),
  ];

const validarSolicitud = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = { validar_employee, validarSolicitud };
