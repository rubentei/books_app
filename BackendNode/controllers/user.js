const ErrorResponse = require("../helper/errorResponse");
const User = require("../models/User");

exports.userRegister = async (req, res, next) => {
  try {
    const { name, lastname, username, email, password } = req.body;
    const userDB = await User.create({
      name,
      lastname,
      username,
      email,
      password,
    });
    console.log('UserDB', userDB);

    const token = userDB.newJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userDB._id,
      name,
      lastname,
      username,
      email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error de registro de usuario " + err, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorResponse("Introducir un email y una contraseña", 400)
      );
    }

    const userDB = await User.findOne({ email }).select("+password");

    if (!userDB) {
      return next(
        new ErrorResponse("El usuario no existe en la base de datos", 400)
      );
    }

    const isValidUser = await userDB.validatePassword(password);

    if (!isValidUser) {
      return next(
        new ErrorResponse("La contrasaeña o el email no son correctos", 400)
      );
    }

    const token = userDB.newJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userDB._id,
      name: userDB.name,
      lastname: userDB.lastname,
      username: userDB.username,
      email: userDB.email,
      token,
    });
  } catch (err) {
    next(new ErrorResponse("Error en el login" + err, 400));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userToken = req.user;
    console.log('user token ', userToken);
    const token = await userToken.newJsonWebToken();

    res.status(200).json({
      status: 200,
      id: userToken._id,
      name: userToken.name,
      lastname: userToken.lastname,
      username: userToken.username,
      email: userToken.email,
      token
    });
  } catch (err) {
    next(new ErrorResponse("Error al obtener la sesión del usuario " + err, 400));
  }
};
