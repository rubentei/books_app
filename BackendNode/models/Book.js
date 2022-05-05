const mongoose = require('mongoose');
const BookScheme = new mongoose.Schema({

    title: {
        required: [true, 'El título es obligatorio'],
        maxlength: [500, 'El título del libro no puede ser mayor de 500 caracteres'],
        type: String
    },

    description: String,
    price: Number,
    releaseDate: Date,
    author: { id: String, completeName: String }
});

module.exports = mongoose.model('Book', BookScheme);