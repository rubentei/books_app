const ErrorResponse = require("../helper/errorResponse");
const Author = require("../models/Author");

exports.createAuthor = async (req, res, next) => {
  try {
    const authorData = await Author.create(req.body);

    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (err) {
    
    next(
      new ErrorResponse("Error, no se pudo crear el autor " + err.message, 404)
    );

  }
};

exports.getAuthorsList = async (req, res, next) => {
  try {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  } catch (err) {

    next(
      new ErrorResponse("No se pudo procesar la petición " + err.message, 404)
    );

  }
};

exports.getAuthorById = async (req, res, next) => {
  
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return next(
        new ErrorResponse(
          "El autor no existe en la base de datos con este Id " + req.params.id,
          404
        )
      );
    }
    res.status(200).json(author);
  } catch (err) {
    
    next(
      new ErrorResponse("El autor no existe con este Id " + req.params.id, 404)
    );
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body);

    if (!author) {
      return next(
        new ErrorResponse("El autor no existe con este Id " + req.params.id, 404)
      );
    }

    res.status(200).json({ status: 200, data: author });
  } catch (err) {
    
    next(
      new ErrorResponse("El autor no existe con este Id " + req.params.id, 404)
    );

  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return next(
        new ErrorResponse("El autor no existe con este Id " + req.params.id, 404)
      );
    }

    res.status(200).json({ status: 200 });
  } catch (err) {
    next(
      new ErrorResponse("El autor no existe con este Id " + req.params.id, 404)
    );
  }
};
