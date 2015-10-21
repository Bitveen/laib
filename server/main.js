var express = require('express');
var mongoose = require('mongoose');
var Book = require('./models/Book');
mongoose.connect("mongodb://localhost:27017/laib");


var server = express();
server.use(express.static(__dirname + '/../public'));

server.get('/', function(req, res) {
    res.send('index.html');
});

server.listen(8080, function() {
    console.log('Listening on port 8080...');
});


server.route('/api/books')
    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err) {
                throw err;
            }
            res.json(books);
        });
    })
    .post(function(req, res) {
        // создать новую книгу
        var rawBody = "";
        req.on("data", function(chunk) {
            rawBody += chunk.toString();
        });

        req.on("end", function() {
            var bookData = JSON.parse(rawBody);
            var book = new Book(bookData);
            book.save(function(err, result) {
                if (err) {
                    throw err;
                }
                res.status(300).json({id: result.id});
            });
        });
    })
    .put(function(req, res) {
        var rawBody = "";
        req.on("data", function(chunk) {
            rawBody += chunk.toString();
        });

        req.on("end", function() {
            var bookData = JSON.parse(rawBody);
            var id = bookData.id;
            delete bookData.id;
            Book.findByIdAndUpdate(id, bookData, function(err) {
                if (err) {
                    throw err;
                }
                res.status(300).send();
            });
        });
    });









