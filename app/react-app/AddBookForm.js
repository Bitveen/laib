var AddBookForm = React.createClass({
    render: function() {
        return (
            <form className="add-book-form__form">
                <FormInput fieldName="Title" />
                <FormInput fieldName="Author" />
                <button type="submit" className="add-book-form__button">Add</button>
                <a href="#" className="add-book-form__button_cancel">Cancel</a>
            </form>
        );
    }
});

ReactDOM.render(<BookList />, document.getElementById('books-area'));
ReactDOM.render(<AddBookForm />, document.getElementById('book-form-container'));

