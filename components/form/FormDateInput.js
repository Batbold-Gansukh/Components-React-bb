var React = require('react')

var FormDateInput = React.createClass({
    getInitialState() {
        return {
            chooseDateModal: null
        }
    },
    propTypes: {
        changedCallback: React.PropTypes.func.isRequired,
        chooseLabel: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        columnName: React.PropTypes.string.isRequired,
        dateInput:React.PropTypes.func.isRequired,
        dateFormatter:React.PropTypes.func.isRequired,
        utils:React.PropTypes.object.isRequired,
        modalAlert:React.PropTypes.func.isRequired
    },
    _cancelChooseDate: function () {
        this.state.chooseDateModal = null
        this.setState(this.state)
    },
    _chooseDate() {
        var DateInput = <this.props.dateInput
            cancelEdit={this._cancelChooseDate}
            updateEdit={this._commitChosenDate}
            utils = {this.props.utils}
            value={this.props.value}
        />
        var topOffset = window.pageYOffset //Global window's offset
        this.state.chooseDateModal = <this.props.modalAlert closeCallback={this._cancelChooseDate}
            inner={DateInput} topOffset={topOffset}/>
        this.setState(this.state)
    },
    _commitChosenDate(newValue) {
        this.props.changedCallback(this.props.columnName, newValue)
        this.state.chooseDateModal = null
        this.setState(this.state)
    },
    render() {
        var colName = this.props.columnName
        return <div className={"row " + colName + "-column"} >
            <div className="large-3 medium-3 small-3 columns">
                <input ref={colName} size="10" type="text" disabled="disabled"
                    value={this.props.dateFormatter(this.props.value)}>
                </input>
            </div>
            <div className="large-9 medium-9 small-9 columns">
                <a className="button tiny" onClick={this._chooseDate}>
                {this.props.chooseLabel || "Сонгох"}
                </a>
            </div>
        {this.state.chooseDateModal}
        </div>
    }
})

module.exports = FormDateInput