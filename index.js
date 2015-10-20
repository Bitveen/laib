var express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'laib',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // сменить на продакшне
});

connection.connect();

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
    connection.query('SELECT * FROM books', function(err, rows) {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.post('/api/books', function(req, res) {
    /* Добавить новую книгу */
    var query = "INSERT INTO books(title, author, poster) " +
        "VALUES("+ req.body.title +", " + req.body.author + ", " + req.body.poster + ")";

    connection.query(query, function(err) {
        if (err) {
            throw err;
        }
        res.json({status: 'created'});
    });
});



app.listen(8000, function() {
    console.log('Server is listening on port 8000...');
});
