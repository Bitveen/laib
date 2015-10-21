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


