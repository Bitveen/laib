var AddBookForm = React.createClass({

    add: function(event) {
        event.preventDefault();
        // TODO: послать данные на сервер, закрыть форму и очистить поля
    },


    cancel: function(event) {
        event.preventDefault();
        // TODO: закрыть форму и очистить все поля
        document.getElementById('book-form-container').style.display = "none";

    },


    render: function() {
        return (
            <form className="add-book-form__form">
                <FormInput fieldName="Title" />
                <FormInput fieldName="Author" />
                <button onClick={this.add} type="submit" className="add-book-form__button">Add</button>
                <a onClick={this.cancel} href="" className="add-book-form__button_cancel">Cancel</a>
            </form>
        );
    }
});



ReactDOM.render(<BookList />, document.getElementById('books-area'));
ReactDOM.render(<AddBookForm />, document.getElementById('book-form-container'));
ReactDOM.render(<AddButton />, document.getElementById('add-button-container'));