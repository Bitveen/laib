var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    title: String,
    author: String,
    tags: Array,
    poster: String,
    id: String
});


module.exports = mongoose.model('Book', BookSchema);
