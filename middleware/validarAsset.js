const {check} = require("express-validator");

const validar_asset = [
    check("name")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ max: 20 }),
    check("type")
      .optional()
      .isLength({ max: 15 }),
    check("code")
      .optional()
      .isLength({ max: 11 })
      .withMessage("El codigo no puede ser de mas de 11 digitos"),
    check("marca").optional(),
    check("purchase_date").notEmpty().withMessage("la fecha de compra es obligatorio"),
    check("description").optional(),
    // check("employeeid").optional
  ];

  module.exports = validar_asset