const bookController = require("../src/controllers/bookController");
const BookModel = require("../src/models/bookModel");

// Mock the BookModel module
jest.mock("../src/models/bookModel", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("bookController", () => {
  let req, res;
  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("getAllBooks", () => {
    test("should send all books", async () => {
      const books = [{ title: "Book 1" }, { title: "Book 2" }];
      BookModel.findAll.mockResolvedValue(books);

      await bookController.getAllBooks(req, res);

      expect(res.send).toHaveBeenCalledWith(books);
    });

    test("should send 500 if there is a server error", async () => {
      BookModel.findAll.mockRejectedValue(new Error("Server error"));

      await bookController.getAllBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.anything()); // Checking if any error message is sent
    });
  });

  describe("createBook", () => {
    beforeEach(() => {
      req.body = { title: "New Book", author: "Author" };
    });

    test("should add a new book and return 201 status", async () => {
      const newBook = { id: 1, title: "New Book", author: "Author" };
      BookModel.create.mockResolvedValue(newBook);

      await bookController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newBook);
    });

    test("should send 500 if there is a server error while adding a book", async () => {
      BookModel.create.mockRejectedValue(new Error("Server error"));

      await bookController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.anything()); // Checking if any error message is sent
    });
  });

  // Similarly, you can add tests for getBookById, updateBook, and deleteBook
});
