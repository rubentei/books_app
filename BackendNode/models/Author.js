const mongoose = require ('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    schoolGrade: String,
    completeName: String,
});

module.exports = mongoose.model('Author', AuthorSchema);