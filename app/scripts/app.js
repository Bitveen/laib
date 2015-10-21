var AddButton = React.createClass({

    showAddForm: function(event) {
        event.preventDefault();
        document.getElementById('book-form-container').style.display = "block";
    },

    render: function() {
        return (
            <a className="header-button__link" href="" onClick={this.showAddForm}>
                <i className="fa fa-plus"></i>
                <span className="header-button__text">Add new book</span>
            </a>
        );
    }
});



var Book = React.createClass({

    makeTags: function() {
        return this.props.tags.map(function(tag, i) {
            return (
                <span className="book__tag-item" key={i}>{tag}</span>
            );
        });
    },

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
                        {this.makeTags()}
                    </div>
                </div>
            </div>
        );
    }
});
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
        this.getBooks().then(function(books) {
            this.setState({books: books});
        }.bind(this)).catch(function(err) {
            console.error(err.toString());
        });
    },

    render: function() {
        return (
            <section className="content">
                <div className="book-list">
                    {this.state.books.map(function(book, i) {
                        return <Book title={book.title} author={book.author} poster={book.poster} key={i} tags={book.tags} />
                    })}
                </div>
            </section>
        );
    }
});



var AddBookForm = React.createClass({

    createBook: function(book) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/books', true);

            xhr.addEventListener('load', function(event) {
                resolve();
            }, false);

            xhr.addEventListener('error', function(event) {
                reject(new Error('Ошибка при создании книги.'));
            }, false);

            xhr.send(JSON.stringify(book));
        });
    },


    handleAddButton: function(event) {
        event.preventDefault();
        var bookTitle = this.refs.bookTitle.value.trim();
        var bookAuthor = this.refs.bookAuthor.value.trim();
        var bookTags = this.refs.bookTags.value.split(',').map((tag => tag.trim()));

        var book = {
            title: bookTitle,
            author: bookAuthor,
            tags: bookTags,
            poster: 'book-1.jpg'
        };

        this.createBook(book).then(function() {
            //закрыть форму и вставить книгу
        });


    },


    handleCancelButton: function(event) {
        event.preventDefault();
        // TODO: закрыть форму и очистить все поля
    },


    render: function() {
        return (
            <div className="add-book-form">
                <form className="add-book-form__form">
                    <div className="add-book-form__row">
                        <label className="add-book-form__label" htmlFor="title">Title</label>
                        <input ref="bookTitle" className="add-book-form__input" type="text" name="title" id="title" />
                    </div>
                    <div className="add-book-form__row">
                        <label className="add-book-form__label" htmlFor="author">Author</label>
                        <input ref="bookAuthor" className="add-book-form__input" type="text" name="author" id="author" />
                    </div>
                    <div className="add-book-form__row">
                        <label className="add-book-form__label" htmlFor="tags">Tags</label>
                        <input ref="bookTags" className="add-book-form__input" type="text" name="tags" id="tags" />
                    </div>
                    <button onClick={this.handleAddButton} type="submit" className="add-book-form__button">Add</button>
                    <a onClick={this.handleCancelButton} href="" className="add-book-form__button_cancel">Cancel</a>
                </form>
            </div>
        );
    }
});



var BookLibrary = React.createClass({
    render: function() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper">
                        <div className="header-title">
                            <h3 className="header-title__text">Library of awesome IT books</h3>
                        </div>
                        <div className="header-button">
                            <AddButton />
                            <AddBookForm />
                        </div>
                    </div>
                </header>

                <div className="wrapper">
                    <BookList />
                    <footer className="footer">
                        <p className="footer-info">
                            &copy; 2015. Made by <a className="footer-link" href="https://github.com/Bitveen">Bitveen</a>. Powered by React.js and Node.js
                        </p>
                    </footer>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<BookLibrary />, document.getElementById('react-container'));