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