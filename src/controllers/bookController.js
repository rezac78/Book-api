const BookModel = require("../models/bookModel.js");

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await BookModel.findAll();
      res.send(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await BookModel.findById(req.params.id);
      if (book) {
        res.send(book);
      } else {
        res.status(404).send({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  createBook: async (req, res) => {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).send(newBook);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateBook: async (req, res) => {
    try {
      const updatedBook = await BookModel.update(req.params.id, req.body);
      if (updatedBook) {
        res.send(updatedBook);
      } else {
        res.status(404).send({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteBook: async (req, res) => {
    try {
      await BookModel.delete(req.params.id);
      res.sendStatus(204); // No Content
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = bookController;
