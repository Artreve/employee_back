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
      .optional().notEmpty().withMessage('El nombre debe tener un valor')
      .isLength({ max: 20 }),
    check("last_name")
      .optional().notEmpty().withMessage('El apellido quipo debe tener un valor')
      .isLength({ max: 15 }),
    check("cuit")
      .optional().notEmpty().withMessage('El cuit debe tener un valor')
      .isLength({ min: 11 }),
    check("team_id").optional().notEmpty().withMessage('El id de quipo debe tener un valor'),
    check("join_date").optional().notEmpty().withMessage('Debes ingresar una fecha'),
    check("rol").optional().notEmpty().withMessage('El rol debe tener un valor')
  ]

module.exports = { validar_employee, validar_update };
