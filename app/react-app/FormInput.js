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

