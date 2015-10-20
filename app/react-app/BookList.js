var BookList = React.createClass({

    getBooks: function() {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/books', true);
            xhr.addEventListener('load', function(event) {
                var response = event.target;
                if (response.status == 200) {
                    resolve(JSON.parse(response.responseText));
                }

            }, false);
            xhr.addEventListener('error', function() {
                reject(new Error('Ошибка при загрузке данных с сервера.'));
            }, false);

            xhr.send(null);
        });
    },

    getInitialState: function() {
        return {
            books: []
        };
    },

    componentDidMount: function() {
        this.getBooks().then(books => this.setState({books: books}))
            .catch(err => console.error(err.toString()));
    },

    render: function() {
        return (
            <div className="book-list">
                {this.state.books.map(function(book) {
                    return <Book title={book.title} author={book.author} poster={book.poster} key={book.id} />
                })}
            </div>
        );
    }
});


