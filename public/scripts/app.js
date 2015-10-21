var Book = React.createClass({

    getInitialState: function() {
        return {
            edit: false
        };
    },

    handleRemoveButton: function(event) {
        event.preventDefault();


    },
    handleEditButton: function(event) {
        event.preventDefault();
        this.setState({
            edit: true
        });
    },

    handleCancelButton: function(event) {
        event.preventDefault();
        this.setState({
            edit: false
        });
    },

    makeTags: function() {
        return this.props.tags.map(function(tag, i) {
            return (
                <span className="book__tag-item" key={i}>{tag}</span>
            );
        });
    },

    renderBookForm: function() {
        return (
            <div className="book book_form">
                <form className="">
                    <div className="add-book-form__row">
                        <label className="add-book-form__label" >Title</label>
                        <input className="add-book-form__input" type="text" defaultValue={this.props.title} />
                    </div>
                    <div className="add-book-form__row">
                        <label className="add-book-form__label" >Author</label>
                        <input className="add-book-form__input" type="text" defaultValue={this.props.author} />
                    </div>
                    <div className="add-book-form__row">
                        <label className="add-book-form__label">Tags</label>
                        <input className="add-book-form__input" type="text" defaultValue={this.props.tags.join(', ')} />
                    </div>
                    <button type="submit" className="add-book-form__button">Save</button>
                    <a href="" onClick={this.handleCancelButton} className="add-book-form__button_cancel">Cancel</a>
                    <a href="" onClick={this.handleRemoveButton} className="add-book-form__button_remove">Remove</a>
                </form>
            </div>
        );
    },

    renderBookView: function() {
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
                <div className="book__actions">
                    <a className="book__action-button" href="" onClick={this.handleEditButton}>Edit</a>
                </div>
            </div>
        );
    },

    render: function() {
        if (this.state.edit) {
            return this.renderBookForm();
        } else {
            return this.renderBookView();
        }
    }
});
var BookList = React.createClass({

    render: function() {
        return (
            <section className="content">
                <div className="book-list">
                    {this.props.books.map(function(book, i) {
                        return <Book title={book.title} author={book.author} poster={book.poster} key={i} tags={book.tags} />
                    })}
                </div>
            </section>
        );
    }


});



var BookForm = React.createClass({

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
            this.refs.bookTitle.value = "";
            this.refs.bookAuthor.value = "";
            this.refs.bookTags.value = "";
            this.props.onBookAdd(book);
        }.bind(this));
    },


    handleCancelButton: function(event) {
        event.preventDefault();
        // TODO: закрыть форму и очистить все поля
        document.querySelector('.add-book-form').style.display = "none";
        this.refs.bookTitle.value = "";
        this.refs.bookAuthor.value = "";
        this.refs.bookTags.value = "";
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
                        <label className="add-book-form__label" htmlFor="tags">Tags (separated by commas)</label>
                        <input ref="bookTags" className="add-book-form__input" type="text" name="tags" id="tags" />
                    </div>
                    <button onClick={this.handleAddButton} type="submit" className="add-book-form__button">Send</button>
                    <a onClick={this.handleCancelButton} href="" className="add-book-form__button_cancel">Cancel</a>
                </form>
            </div>
        );
    }
});



var BookLibrary = React.createClass({

    viewForm: function(event) {
        event.preventDefault();
        document.querySelector('.add-book-form').style.display = "block";
    },

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

    componentDidMount: function() {
        this.getBooks().then(function(books) {
            this.setState({books: books});
        }.bind(this)).catch(function(err) {
            console.error(err.toString());
        });
    },


    handleBookAdd: function(book) {
        var newBooks = this.state.books.concat([book]);
        document.querySelector('.add-book-form').style.display = "none";
        this.setState({books: newBooks});
    },


    getInitialState: function() {
        return {
            books: []
        };
    },


    render: function() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper">
                        <div className="header-title">
                            <h3 className="header-title__text">Library of awesome IT books</h3>
                        </div>
                        <div className="header-button">
                            <a className="header-button__link" href="" onClick={this.viewForm}>
                                <i className="fa fa-plus"></i>
                                <span className="header-button__text">Add new book</span>
                            </a>
                            <BookForm onBookAdd={this.handleBookAdd}/>
                        </div>
                    </div>
                </header>

                <div className="wrapper">
                    <BookList books={this.state.books} />
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