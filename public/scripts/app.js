var Book = React.createClass({
    render: function() {
        var pathToPoster = "images/books-posters/" + this.props.poster;
        return (
            <div className="book">
                <div className="book__poster">
                    <img className="book__img" src={pathToPoster} />
                </div>
                <div className="book__desc">
                    <div className="book__title">{this.props.title}</div>
                    <div className="book__author">{this.props.author}</div>
                    <div className="book__tags">
                        {this.props.tags.map(function(tag, i) {
                            return <a className="book__tag-item" href="#" key={i}>{tag}</a>
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

var data = [
    {
        poster: 'book-1.jpg',
        title: 'WebSockets1',
        author: 'Andrew Lombardi',
        tags: [
            'js',
            'web sockets',
            'html5'
        ]
    },
    {
        poster: 'book-1.jpg',
        title: 'WebSockets2',
        author: 'Andrew Lombardi',
        tags: [
            'js',
            'web sockets',
            'html5'
        ]
    },
    {
        poster: 'book-1.jpg',
        title: 'WebSockets3',
        author: 'Andrew Lombardi',
        tags: [
            'js',
            'web sockets',
            'html5'
        ]
    }
];


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
            xhr.addEventListener('error', function(event) {
                reject(new Error('Ошибка при загрузке данных с сервера!'));
            }, false);
        });
    },


    getInitialState: function() {
        return {
            books: []
        };
    },

    componentWillMount: function() {
        'use strict';
        this.getBooks()
            .then(books => this.setState({books: books}))
            .catch(err => console.error(err.toString()));
    },


    render: function() {
        return (
            <div className="book-list">
                {this.state.books.map(function(book, i) {
                    return <Book title={book.title} author={book.author} tags={book.tags} poster={book.poster} key={i} />
                })}
            </div>
        );
    }
});

ReactDOM.render(<BookList />, document.getElementById('books-area'));

