const {check} = require("express-validator");
const validar_employee =
  [
    check("first_name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ max: 20 }),
    check("last_name")
      .notEmpty()
      .withMessage("El apellido es obligatorio")
      .isLength({ max: 15 }),
    check("cuit")
      .notEmpty()
      .withMessage("El cuit es obligatorio")
      .isLength({ min: 11 }),
    check("team_id").notEmpty().withMessage("El id de equipo es obligatorio"),
    check("join_date").notEmpty().withMessage("la fecha es obligatorio"),
    check("rol").notEmpty().withMessage("El rol es obligatorio"),
  ];

  const validar_update = [
    check("first_name")
      .optional()
      .isLength({ max: 20 }),
    check("last_name")
      .optional()
      .isLength({ max: 15 }),
    check("cuit")
      .optional()
      .isLength({ min: 11 }),
    check("team_id").optional(),
    check("join_date").optional(),
    check("rol").optional()
  ]

module.exports = { validar_employee, validar_update };
