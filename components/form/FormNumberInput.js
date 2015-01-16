var React = require('react')

var FormNumberInput = React.createClass({
    getDefaultProps() {
        return {
            value: null,
            type: "int",
            errorLabel: "Зөвхөн тоон утга оруулна уу.",
            isOptional: true,
            optionalLabel: "Тоон утга оруулна уу.",
            min: Number.MIN_VALUE,
            minLabel:" -аас бага байж болохгүй",
            max: Number.MAX_VALUE,
            maxLabel:" -аас их байж болохгүй"
        }
    },
    propTypes: {
        columnName: React.PropTypes.string.isRequired,
        onChangeEvent: React.PropTypes.func.isRequired,
        value: React.PropTypes.string,
        type: React.PropTypes.string,
        isOptional: React.PropTypes.bool,
        optionalLabel: React.PropTypes.string,
        errorLabel: React.PropTypes.string,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        minLabel: React.PropTypes.string,
        maxLabel: React.PropTypes.string
    },
    _checkValue(value, type) {
        if (type === "float") {
            if ((parseFloat(value) + "") !== value)
                return this.props.errorLabel
        } else if ((parseInt(value) + "") !== value)
            return this.props.errorLabel
        return null
    },
    _isEmpty(value) {
        return (value === undefined || value === null || (value + "").length === 0)
    },
    _checkMinMax(value, type) {
        var val = (type === "float") ? parseFloat(value) : parseInt(value)
        if (val < this.props.min) return this.props.min+this.props.minLabel
        if (val > this.props.max) return this.props.max+this.props.maxLabel
        return null
    },
    render() {
        var props = this.props
        var columnName = props.columnName
        var errorLabel = ((self)=> {
            if (self._isEmpty(props.value) === false)
                return self._checkValue(props.value, props.type)
            return null
        })(this)

        errorLabel = ((self)=>{
            if(errorLabel === null)
                return self._checkMinMax(props.value,props.type)
            return errorLabel
        })(this)

        var optionalLabel = this.props.isOptional?"":this.props.optionalLabel

        return <span>
            <input className={columnName + "-column"} type="text"
                value={props.value}
                id={columnName} onChange={props.onChangeEvent}
                placeholder={optionalLabel}
            />
        {(errorLabel !== null) ?
            <small className="error">{errorLabel}</small>
            : null}
        </span>
    }
})

module.exports = FormNumberInput