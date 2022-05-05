const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor introduzca un nombre"],
  },
  lastname: {
    type: String,
    required: [true, "Por favor introduzca un apellido"],
  },
  username: {
    type: String,
    required: [true, "Por favor introduzca un nombre de usuario"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Por favor introduzca un email"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Introduzca un email válido"],
  },
  password: {
    type: String,
    required: [true, "Por favor introduzca una contraseña"],
    minlength: 6,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.newJsonWebToken = function () {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET_WORD, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.validatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
