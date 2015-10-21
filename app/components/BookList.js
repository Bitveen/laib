var BookList = React.createClass({

    render: function() {
        return (
            <section className="content">
                <div className="book-list">
                    {this.props.books.map(function(book, i) {
                        return <Book title={book.title} author={book.author} poster={book.poster} key={i} tags={book.tags} />
                    })}
                </div>
            </section>
        );
    }


});


