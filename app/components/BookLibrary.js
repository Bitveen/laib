var BookLibrary = React.createClass({
    render: function() {
        return (
            <div>
                <header className="header">
                    <div className="wrapper">
                        <div className="header-title">
                            <h3 className="header-title__text">Library of awesome IT books</h3>
                        </div>
                        <div className="header-button">
                            <AddButton />
                            <AddBookForm />
                        </div>
                    </div>
                </header>

                <div className="wrapper">
                    <BookList />
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