'use strict'

var React = require('react')
var Link = require('react-router').Link
var FormInputRender = require('./FormInputRender')
var FormDateInput = require('./FormDateInput')
var FormNumberInput = require('./FormNumberInput')
var FormTextInput = require('./FormTextInput')
var _ = require('lodash')

var Form = React.createClass({
  getInitialState() {
    return {values: {}, choosingDate: null}
  },
  componentWillMount() {
    _.forIn(this.props.columns, (v, k)=> {
      this.state.values[k] = ""
    })
  },
  _createNew() {
    var self = this
    var columns = this.props.columns
    var columnValues = {}
    var values = this.state.values
    _.keys(values).map(function (key) {
      if (columns[key].type === "int") {
        columnValues[key] = parseInt(values[key])
      } else if (columns[key].type === "float") {
        columnValues[key] = parseFloat(values[key])
      } else if (columns[key].type === "date") {
        columnValues[key] = parseInt(values[key])
      } else {
        columnValues[key] = values[key]
      }
    })
    this.props.commitAction(columnValues)
  },
  _onChange(evt) {
    this._onValueChange(evt.target.id, evt.target.value)
  },
  _onValueChange(colName, value) {
    this.state.values[colName] = value
    this.setState(this.state)
  },

  _destroyStatus() {
    if (this.isMounted()) {
      this.props.status = null
      this.setState(this.state)
    }
  },
  _getAlert(cls) {
    setTimeout(this._destroyStatus, this.props.timeout || 3000)
    return (<div className={"alert-box small " + cls}>{this.props.msg}</div>)
  },
  _alert(status) {
    if (status === 'success' || status === 'error')
      return this._getAlert(status)
    return null
  },
  _loading(loading) {
    if (loading === true)
      return (<img width="14" src={this.props.loadingSpin} />)
    return (<span>{this.props.commitLabel || "Нэмэх"}</span>)
  },

  propTypes: {
    columns: React.PropTypes.object.isRequired,
    timeout: React.PropTypes.number,
    msg: React.PropTypes.string,
    status: React.PropTypes.string,
    loading: React.PropTypes.bool.isRequired,
    loadingSpin: React.PropTypes.string.isRequired,
    commitAction: React.PropTypes.func.isRequired,
    commitLabel: React.PropTypes.string,
    values: React.PropTypes.object,
    tableDescription: React.PropTypes.string,
    backAction: React.PropTypes.func.isRequired,
    backLabel: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      backLabel: "Буцах",
      values: {}
    }
  },
  /*
   ----- column format ----
   key:{
   name:String,
   columnName:String,
   type:String[date,int,float,text], default->text
   isOptional:boolean [true,fales], default->true should not be used when type is text
   optionalLabel:String, default error msg in mongolia, should not be used when type is text (min=0 is equal to optional)
   min:number, when string -> min length, when [int,float]-> min value
   minLabel:String, default-> error msg in mongolia
   max:number, when string -> max length, when [int,float]->max value
   maxLabel:String, default -> error msg in mongolia
   }
   */
  render() {
    var columns = this.props.columns
    var self = this

    return <div>
      <div className="row">
        <div className="large-12 columns">
          <h3 className="entityDesc">{this.props.tableDescription}</h3>
        </div>
      </div>
        {_.keys(columns).map(key => {
          return (<div className="row" key={key}>
            <div className="large-12 medium-12 small-12 columns" >
              <label>{columns[key].name}
                <FormInputRender
                  onChangeEvent={this._onChange}
                  valueChange={this._onValueChange}
                  value={self.state.values[key]}
                  column={columns[key]}
                  formDateInput = {FormDateInput}
                  formNumberInput = {FormNumberInput}
                  formTextInput = {FormTextInput}
                  min={columns[key].min}
                  minLabel={columns[key].minLabel}
                  max={columns[key].max}
                  maxLabel={columns[key].maxLabel}
                />
              </label>
            </div>
          </div>)
        })}
      <div className="row">
        <div className="large-1 medium-2 small-12 columns">
          <a className="button extra tiny success" onClick={this._createNew}>
                        {this._loading(this.props.loading)}
          </a>
        </div>
        <div className="large-1 medium-2 small-12 columns">
          <a className="button tiny" onClick={this.props.backAction}>
                        {this.props.backLabel}
          </a>
        </div>
        <div className="large-10 medium-8 small-12 columns">
                    {this._alert(this.props.status)}
        </div>
      </div>
    </div>
  }
})

module.exports = Form