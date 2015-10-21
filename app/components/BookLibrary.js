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