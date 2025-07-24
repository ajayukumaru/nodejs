const Book = require('../models/Book');
const ApiError = require('../utils/ApiError');

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) throw (new ApiError('Book not found', 404));
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  if (req.user.role !== 'admin') return next(new ApiError('Only admin can delete books', 403));
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) throw (new ApiError('Book not found', 404));
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};