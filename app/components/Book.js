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