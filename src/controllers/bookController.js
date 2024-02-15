const BookModel = require("../models/bookModel.js");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.findAll();
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error while retrieving books.",
    });
  }
};
exports.getBookById = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (book) {
      res.status(200).json({ success: true, data: book });
    } else {
      res.status(404).json({ success: false, message: "Book not found." });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error while retrieving the book.",
    });
  }
};
exports.createBook = async (req, res) => {
  if (!req.body.title || !req.body.author) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide title and author." });
  }

  try {
    const newBook = await BookModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully.",
      data: newBook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error while creating the book.",
    });
  }
};
exports.updateBook = async (req, res) => {
  if (!req.body.title && !req.body.author) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide data to update." });
  }
  try {
    const updatedBook = await BookModel.update(req.params.id, req.body);
    if (updatedBook) {
      res.status(200).json({
        success: true,
        message: "Book updated successfully.",
        data: updatedBook,
      });
    } else {
      res.status(404).json({ success: false, message: "Book not found." });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error while updating the book.",
    });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await BookModel.delete(req.params.id);
    if (deleted) {
      res.status(201).json({
        success: false,
        message: "Book Delete successfully.",
      });
    } else {
      res.status(404).json({ success: false, message: "Book not found." });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error while deleting the book.",
    });
  }
};
