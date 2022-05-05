const Book = require("../models/Book");
const ErrorResponse = require("../helper/errorResponse");

exports.getBooks = async (req, res, next) => {
  try {
    const bookList = await Book.find();

    res.status(200).json(bookList);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const bookUnique = await Book.findById(req.params.id);

    if (!bookUnique) {
      return next(new ErrorResponse("No se pudo encontrar el libro", 404));
    }

    res.status(200).json(bookUnique);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const bookUnique = await Book.create(req.body);

    res.status(200).json({
      status: 200,
      data: bookUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const bookUnique = await Book.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      data: bookUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const bookUnique = await Book.findByIdAndDelete(req.params.id);

    if (!bookUnique) {
      return next(new ErrorResponse("El libro no existe", 400));
    }

    res.status(200).json({
      status: 200,
      data: bookUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};

exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValue = "";
    let filterProperty = "";
    let books = [];

    let totalRows = 0;

    // filterValue = {value: "", property: ""}
    if (req.body.filterValue) {
      filterValue = req.body.filterValue.value;
      filterProperty = req.body.filterValue.property;

      books = await Book.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Book.find({
        [filterProperty]: new RegExp(filterValue, "i"),
      }).count();

    } else {
      books = await Book.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Book.find().count();
    }

    const pageQuantity = Math.ceil(totalRows / pageSize);

    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirection,
      pageQuantity,
      totalRows,
      data: books,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 400)
    );
  }
};
