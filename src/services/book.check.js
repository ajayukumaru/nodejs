const Book = require('../models/Book');

export async function checkbook(){
    const books = await Book.findOne();
        if (books) {
          return true;
        }
    return false;
}