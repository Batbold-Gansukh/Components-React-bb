var React = require('react')
var DateInput = require('../input/DateInput')
var ModalAlert = require('../modal/ModalAlert')
var utils = require('../utils/Utils')

var FormInputRender = React.createClass({

    propTypes: {
        onChangeEvent: React.PropTypes.func,
        valueChange: React.PropTypes.func,
        value: React.PropTypes.any.isRequired,
        column: React.PropTypes.object.isRequired,
        formDateInput:React.PropTypes.func,
        formTextInput:React.PropTypes.func,
        formNumberInput:React.PropTypes.func
    },

    render() {
        var props = this.props
        var column = props.column
        var columnName = column.columnName

        return (() => {
            if (column.type === "date") {
                return <props.formDateInput changedCallback={props.valueChange}
                    chooseLabel={undefined}
                    value={props.value}
                    columnName = {columnName}
                    dateInput={DateInput}
                    utils = {utils}
                    dateFormatter={utils.formatDate}
                    modalAlert={ModalAlert} />
            } else if(column.type === "float" || column.type === 'int'){
                return <props.formNumberInput
                    columnName={columnName}
                    onChangeEvent={props.onChangeEvent}
                    value={props.value}
                    min={props.min} max={props.max}
                    minLabel={props.minLabel} maxLabel={props.maxLabel}
                    type={column.type}
                />
            } else {
                return <props.formTextInput  value={props.value}
                    columnName={columnName} onChange={props.onChangeEvent}
                    min={props.min} max={props.max}
                    minLabel={props.minLabel} maxLabel={props.maxLabel}
                />
            }
        })()
    }
})

module.exports = FormInputRender