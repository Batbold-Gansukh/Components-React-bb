var React = require("react")

var DateInput =  React.createClass({

    _updateDateEdit : function () {
        //console.log("updating:" + this.refs.yearInput.getDOMNode().value + " " + this.refs.monthInput.getDOMNode().value)
        var updateDate = new Date(
            parseInt(this.refs.yearInput.getDOMNode().value),
            parseInt(this.refs.monthInput.getDOMNode().value) - 1,
            parseInt(this.refs.dayInput.getDOMNode().value),
            0, 0, 0
        )
        //updateDate.setTime(updateDate.getTime() + updateDate.getTimezoneOffset() * 60 * 1000)
        updateDate = this.props.utils.clearTimezone(updateDate)
        //self.refs.dateInput.getDOMNode().value = updateDate.getTime()
        this.props.updateEdit(updateDate.getTime())
    },

    _onKeyup:function(evt){
        if(evt.which === 13){
            evt.preventDefault()
            this._updateDateEdit()
        }
    },

    render:function() {
        var value = this.props.value
        var date = new Date(value || new Date(0).getTime())
        var yearInput = <input ref="yearInput" size="6" defaultValue={date.getFullYear()} onKeyUp={this._onKeyup}/>
        var yearLabel = this.props.yearLabel || "Жил"
        var monthInput = <input ref="monthInput" size="3" defaultValue={date.getMonth() + 1} onKeyUp={this._onKeyup}/>
        var monthLabel = this.props.monthLabel || "Сар"
        var dayInput = <input ref="dayInput" size="3" defaultValue={date.getDate()} onKeyUp={this._onKeyup}/>
        var dayLabel = this.props.dayLabel || "Өдөр"

        return (<div>
            <table>
                <thead>
                    <tr>
                        <td>{yearLabel}</td>
                        <td>{monthLabel}</td>
                        <td>{dayLabel}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{yearInput}</td>
                        <td>{monthInput}</td>
                        <td>{dayInput}</td>
                    </tr>
                </tbody>
            </table>
            <span onClick={this._updateDateEdit} className="inline-update">&#10004;</span>
            <span onClick={this.props.cancelEdit} className="inline-cancel">&#x2717;</span>
        </div>)
    }
})

module.exports = DateInput
