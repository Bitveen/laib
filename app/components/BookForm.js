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


