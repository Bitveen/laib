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


