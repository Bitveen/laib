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
        this.getBooks().then(books => this.setState({books: books}))
            .catch(err => console.error(err.toString()));
    },

    render: function() {
        return (
            <div className="book-list">
                {this.state.books.map(function(book) {
                    return <Book title={book.title} author={book.author} poster={book.poster} key={book.id} />
                })}
            </div>
        );
    }
});



var FormInput = React.createClass({

    render: function() {
        var fieldName = this.props.fieldName;
        return (
            <div className="add-book-form__row">
                <label className="add-book-form__label" htmlFor={fieldName.toLowerCase()}>{fieldName}</label>
                <input className="add-book-form__input" type="text" name={fieldName.toLowerCase()} id={fieldName.toLowerCase()} />
            </div>
        );
    }
});


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