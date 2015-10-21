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


