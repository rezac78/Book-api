const BookModel = require("../src/models/bookModel.js");
const db = require("../src/db");

jest.mock("../src/db");

describe("BookModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all books", async () => {
      const books = [{ title: "Book 1" }, { title: "Book 2" }];
      db.find.mockImplementation((query, callback) => callback(null, books));

      const result = await BookModel.findAll();
      expect(result).toEqual(books);
    });

    it("should handle errors", async () => {
      const errorMessage = new Error("Error finding books");
      db.find.mockImplementation((query, callback) =>
        callback(errorMessage, null)
      );

      await expect(BookModel.findAll()).rejects.toEqual(errorMessage);
    });
  });
  describe("findById", () => {
    it("should find a book by id and return it", async () => {
      const book = { _id: "1", title: "Test Book", author: "Test Author" };
      db.findOne.mockImplementation((query, callback) => callback(null, book));

      const result = await BookModel.findById("1");
      expect(result).toEqual(book);
    });

    it("should handle errors when finding a book by id", async () => {
      db.findOne.mockRejectedValue(new Error("Error finding book by id"));
    });
  });
  describe("update", () => {
    it("should update a book successfully", async () => {
      const updatedData = { title: "Updated Book" };
      db.update.mockImplementation((query, update, options, callback) =>
        callback(null, 1)
      );
      const result = await BookModel.update("1", updatedData);
      expect(result).toBe(1);
    });
    it("should handle errors during book update", async () => {
      db.update.mockRejectedValue(new Error("Error updating book"));
    });
  });
  describe("delete", () => {
    it("should delete a book successfully", async () => {
      db.remove.mockImplementation((query, options, callback) =>
        callback(null, 1)
      );

      const result = await BookModel.delete("1");
      expect(result).toBe(1);
    });

    it("should handle errors during book deletion", async () => {
      db.remove.mockRejectedValue(new Error("Error deleting book"));
    });
  });
});
