const db = require("../db");

class BookModel {
  static findAll(callback) {
    db.find({}, callback);
  }

  static findById(id, callback) {
    db.findOne({ _id: id }, callback);
  }

  static create(book, callback) {
    db.insert(book, callback);
  }

  static update(id, updateData, callback) {
    db.update({ _id: id }, { $set: updateData }, {}, callback);
  }

  static delete(id, callback) {
    db.remove({ _id: id }, {}, callback);
  }
}

module.exports = BookModel;
