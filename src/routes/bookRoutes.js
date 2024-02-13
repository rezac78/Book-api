const express = require("express");
const bookController = require("../controllers/bookController.js");
const {
  createBookValidationRules,
  updateBookValidationRules,
  validate,
} = require("../../validators/bookValidator.js");
const router = express.Router();
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post(
  "/",
  createBookValidationRules(),
  validate,
  bookController.createBook
);
router.put(
  "/:id",
  updateBookValidationRules(),
  validate,
  bookController.updateBook
);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
