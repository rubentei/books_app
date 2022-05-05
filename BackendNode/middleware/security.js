const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.security = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new ErrorResponse("No se ha podido verificar el token", 400));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_WORD);
    const userDB = await User.findOne({ username: decodedToken.username });

    req.user = userDB;

    next();

  } catch (err) {
    return next(new ErrorResponse("Error en el proceso del token " + err, 400));
  }
};
