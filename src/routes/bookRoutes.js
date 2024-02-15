const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");
const {
  createBookValidationRules,
  updateBookValidationRules,
  validate,
} = require("../Middleware/validatorsMiddleware.js");
const router = express.Router();
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBookValidationRules(), validate, createBook);
router.put("/:id", updateBookValidationRules(), validate, updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
