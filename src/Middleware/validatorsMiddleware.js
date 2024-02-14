const { body, validationResult } = require("express-validator");
const createBookValidationRules = () => {
  return [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("author").not().isEmpty().withMessage("Author is required"),
    body("genre").not().isEmpty().withMessage("Genre is required"),
  ];
};
const updateBookValidationRules = () => {
  return [
    body("title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title cannot be empty"),
    body("author")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Author cannot be empty"),
    body("genre")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Genre cannot be empty"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    success: false,
    errors: extractedErrors,
  });
};
module.exports = {
  createBookValidationRules,
  updateBookValidationRules,
  validate,
};