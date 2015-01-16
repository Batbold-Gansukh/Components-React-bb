var React = require('react')

var FormTextInput = React.createClass({
    getDefaultProps() {
        return {
            value: "",
            optionalLabel: "Хоосон байж болохгүй.",
            min: 0,
            minLabel:"Хэт богино байна.",
            max: 255,
            maxLabel:"Хэт урт байна."
        }
    },
    //optional is determined by min>0
    propTypes: {
        columnName: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        optionalLabel: React.PropTypes.string,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        minLabel: React.PropTypes.string,
        maxLabel: React.PropTypes.string
    },
    _checkValue(value) {
        var props = this.props
        if(value.length < props.min) return props.minLabel
        if(value.length > props.max) return props.maxLabel
        return null
    },
    render() {
        var props = this.props
        var columnName = props.columnName
        var errorLabel = this._checkValue(props.value)

        var optionalLabel = props.min>0?this.props.optionalLabel:""

        return <span>
            <input className={columnName + "-column"} type="text"
                value={props.value}
                id={columnName} onChange={props.onChange}
                placeholder={optionalLabel}
            />
        {(errorLabel !== null) ?
            <small className="error">{errorLabel}</small>
            : null}
        </span>
    }
})

module.exports = FormTextInput