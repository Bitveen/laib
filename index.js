var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/* Основная точка входа */
app.get('/', function(req, res) {
    res.send('index.html');
});





/* API для работы с книгами */
app.get('/api/books', function(req, res) {
    /* Получить все книги */


});

app.post('/api/books', function(req, res) {
    /* Добавить новую книгу */

});



app.listen(8000, function() {
    console.log('Server is listening on port 8000...');
});