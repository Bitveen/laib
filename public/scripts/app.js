var Book = React.createClass({
    getInitialState: function() {
        return {
            edit: false
        };
    },

    save: function(book) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', '/api/books', true);

            xhr.addEventListener('load', function(event) {
                resolve();
            }, false);

            xhr.addEventListener('error', function(event) {
                reject(new Error('Ошибка при обновлении книги.'));
            }, false);

            xhr.send(JSON.stringify(book));
        });
    },

    handleSaveButton: function(event) {
        event.preventDefault();

        var bookTitle = this.refs.bookTitle.value.trim();
        var bookAuthor = this.refs.bookAuthor.value.trim();
        var bookTags = this.refs.bookTags.value.split(',').map((tag => tag.trim()));
        var bookPublicationYear = this.refs.bookPublicationYear.value.trim();

        var book = {
            title: bookTitle,
            author: bookAuthor,
            publicationYear: bookPublicationYear,
            tags: bookTags,
            id: this.props.bookId
        };


        this.save(book).then(function() {
            this.setState({
                edit: false
            });
        });



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
            <div className="col">
                <div className="book book_form">
                    <form className="book__form">
                        <div className="add-book-form__row">
                            <label className="add-book-form__label" >Title</label>
                            <input ref="bookTitle" className="add-book-form__input" type="text" defaultValue={this.props.title} />
                        </div>
                        <div className="add-book-form__row">
                            <label className="add-book-form__label" >Author</label>
                            <input ref="bookAuthor" className="add-book-form__input" type="text" defaultValue={this.props.author} />
                        </div>
                        <div className="add-book-form__row">
                            <label className="add-book-form__label" >Publication year</label>
                            <input ref="bookPublicationYear" className="add-book-form__input" type="text" defaultValue={this.props.publicationYear} />
                        </div>

                        <div className="add-book-form__row">
                            <label className="add-book-form__label">Tags</label>
                            <input ref="bookTags" className="add-book-form__input" type="text" defaultValue={this.props.tags.join(', ')} />
                        </div>
                        <button type="submit" onClick={this.handleSaveButton} className="add-book-form__button">Save</button>
                        <a href="" onClick={this.handleCancelButton} className="add-book-form__button_cancel">Cancel</a>
                    </form>
                </div>
            </div>

        );
    },

    renderBookView: function() {
        var pathToPoster = "images/books-posters/" + this.props.poster;

        return (
            <div className="col">
                <div className="book">
                    <div className="book__info">
                        <div className="book__info-label">Title</div>
                        <div className="book__info-text">{this.props.title}</div>
                    </div>
                    <div className="book__info">
                        <div className="book__info-label">Author</div>
                        <div className="book__info-text">{this.props.author}</div>
                    </div>
                    <div className="book__info">
                        <div className="book__info-label">Publication year</div>
                        <div className="book__info-text">{this.props.publicationYear}</div>
                    </div>

                    <div className="book__info">
                        <div className="book__info-label">Tags</div>
                        <div className="book__info-text">{this.makeTags()}</div>
                    </div>
                    <div className="book__actions">
                        <a className="book__action-button" href="" onClick={this.handleEditButton}>Edit</a>
                    </div>
                </div>
            </div>
        );
    },

    render: function() {
        console.log(this.props);
        if (this.state.edit) {
            return this.renderBookForm();
        } else {
            return this.renderBookView();
        }
    }
});
var BookList = React.createClass({

    render: function() {

        if (this.props.books.length == 0) {
            return (
                <section className="content">
                    <div className="book-list">
                        <p className="book-empty">There is no books at this moment.</p>
                    </div>
                </section>
            );
        } else {
            return (
                <section className="content">
                    <div className="book-list">
                        {this.props.books.map(function(book, i) {
                            return <Book title={book.title} author={book.author} publicationYear={book.publicationYear} key={i} bookId={book._id}  tags={book.tags} />
                        })}
                    </div>
                </section>
            );
        }



    }


});



var BookForm = React.createClass({

    createBook: function(book) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/books', true);

            xhr.addEventListener('load', function(event) {
                resolve(JSON.parse(event.target.responseText));
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
        var bookPublicationYear = this.refs.bookPublicationYear.value.trim();


        var book = {
            title: bookTitle,
            author: bookAuthor,
            publicationYear: bookPublicationYear,
            tags: bookTags
        };

        this.createBook(book).then(function(response) {

            this.refs.bookTitle.value = "";
            this.refs.bookAuthor.value = "";
            this.refs.bookPublicationYear.value = "";
            this.refs.bookTags.value = "";

            book.id = response.id;
            this.props.onBookAdd(book);

        }.bind(this));
    },


    handleCancelButton: function(event) {
        event.preventDefault();
        document.querySelector('.add-book-form').style.display = "none";
        document.querySelector('.add-book-area').style.display = "block";
        this.refs.bookTitle.value = "";
        this.refs.bookAuthor.value = "";
        this.refs.bookPublicationYear.value = "";
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
                        <label className="add-book-form__label" htmlFor="publicationYear">Publication year</label>
                        <input ref="bookPublicationYear" className="add-book-form__input" type="text" name="publicationYear" id="publicationYear" />
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
        document.querySelector('.add-book-area').style.display = "none";
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
        document.querySelector('.add-book-area').style.display = "block";
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
                    </div>
                </header>
                <div className="wrapper">
                    <div className="add-book-area">
                        <a href="" onClick={this.viewForm} className="add-book-button">Add new book</a>
                    </div>
                    <BookForm onBookAdd={this.handleBookAdd} />
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