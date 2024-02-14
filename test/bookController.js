const bookController = require("../src/controllers/bookController");
const BookModel = require("../src/models/bookModel");
const httpMocks = require("node-mocks-http");

// Mock the BookModel methods
jest.mock("../src/models/bookModel", () => ({
  update: jest.fn(),
  delete: jest.fn(),
}));
describe("bookController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });
  describe("getAllBooks", () => {
    it("should return all books and a status of 200", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const books = [{ title: "Book 1" }, { title: "Book 2" }];

      BookModel.findAll.mockResolvedValue(books);

      await bookController.getAllBooks(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ success: true, data: books });
    });

    it("should handle errors with a status of 500", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const errorMessage = { message: "Server error while retrieving books." };

      BookModel.findAll.mockRejectedValue(new Error(errorMessage.message));

      await bookController.getAllBooks(req, res);
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        success: false,
        error: errorMessage.message,
      });
    });
  });

  describe("createBook", () => {
    it("should return 400 if title or author is missing", async () => {
      req.body = {};
      await bookController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Please provide title and author.",
      });
    });

    it("should create a book and return 201 status on success", async () => {
      req.body = { title: "Test Book", author: "Test Author" };
      const newBook = { id: 1, title: "Test Book", author: "Test Author" };

      BookModel.create.mockResolvedValue(newBook);

      await bookController.createBook(req, res);

      expect(BookModel.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Book created successfully.",
        data: newBook,
      });
    });

    it("should handle errors and return 500 status", async () => {
      req.body = { title: "Test Book", author: "Test Author" };
      const errorMessage = "Server error while creating the book.";

      BookModel.create.mockRejectedValue(new Error(errorMessage));

      await bookController.createBook(req, res);

      expect(BookModel.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage,
      });
    });
  });
  describe("updateBook", () => {
    beforeEach(() => {
      req.params = { id: "1" };
      req.body = { title: "Updated Title" };
      res.json = jest.fn();
      res.status = jest.fn().mockReturnThis();
    });

    it("should update a book successfully", async () => {
      BookModel.update.mockResolvedValue(true);

      await bookController.updateBook(req, res);

      expect(BookModel.update).toHaveBeenCalledWith("1", {
        title: "Updated Title",
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Book updated successfully.",
        data: true,
      });
    });

    it("should handle errors when updating a book", async () => {
      BookModel.update.mockRejectedValue(new Error("Update failed"));

      await bookController.updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Server error while updating the book.",
      });
    });
  });
  describe("deleteBook", () => {
    beforeEach(() => {
      req.params = { id: "1" };
      res.json = jest.fn();
      res.status = jest.fn().mockReturnThis();
    });

    it("should delete a book successfully", async () => {
      BookModel.delete.mockResolvedValue(true); 

      await bookController.deleteBook(req, res);

      expect(BookModel.delete).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Book deleted successfully.",
      });
    });

    it("should handle errors when deleting a book", async () => {
      BookModel.delete.mockRejectedValue(new Error("Deletion failed"));

      await bookController.deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Server error while deleting the book.",
      });
    });
  });
});
