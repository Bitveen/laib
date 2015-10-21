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