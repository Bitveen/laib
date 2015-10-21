var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    title: String,
    author: String,
    publicationYear: Number,
    tags: Array
});


module.exports = mongoose.model('Book', BookSchema);
