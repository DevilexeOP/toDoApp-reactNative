const { check, validationResult } = require("express-validator");
exports.validateUser = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email cannot be blank"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ success: false, error: error[0].msg});
};
