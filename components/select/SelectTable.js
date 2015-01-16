var React = require("react")
var $ = require("superagent")
var Pagination = require("../pagination/Pagination")
var utils = require("../utils/Utils")

var TableCell = React.createClass({
  render: function () {
    var value = (function (self) {
      if (self.props.columnType === "date") {
        var date = new Date(self.props.value)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + " " + date.getDate()
      } else if (self.props.columnType === "img") {
        return <img width="48" src={self.props.value} />
      }
      return self.props.value
    })(this)
    return <td>
        {value}
    </td>
  }
})

var SelectTable = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    loadingSpin: React.PropTypes.string.isRequired,
    table: React.PropTypes.string.isRequired,
    from: React.PropTypes.number.isRequired,
    columns: React.PropTypes.object.isRequired,
    delta: React.PropTypes.number.isRequired,
    token: React.PropTypes.string,
    count: React.PropTypes.number.isRequired
  },
  getInitialState: function () {
    return {search: "", loading: true}
  },
  _indexList: function (list) {
    var indexed = {}
    Object.keys(list).map(function (key, i) {
      indexed[list[key].ID] = list[key]
    })
    return indexed
  },
  _post: function () {
    var self = this
    var searchPattern = (function (search) {
      var s = search
      if (s === undefined || s === null || s.length === 0)
        return null
      return s
    })(this.state.search)
    $.post(this.props.url)
      .set('X-Auth-Token', this.props.token)
      .send({name: self.props.table, from: self.state.from, count: self.props.count, search: searchPattern})
      .end(function (err, res) {
        console.log("respons status:" + res.ok)
        if (res.ok) {
          self.state.size = res.body.size
          self.state.rows = self._indexList(res.body.list)
          self.state.loading = false
          self.setState(self.state)
        } else {
          console.log("Request error:" + err)
        }
      })
  },
  _search: function (evt) {
    if (evt.which === 13) {
      this.state.from = 1
      this.state.search = evt.target.value
      this._post()
    }
  },
  _select: function (id) {
    console.log("Selected id:" + id + " " + JSON.stringify(this.state.rows[id]))
    this.props.selectedRow(this.state.rows[id])
  },
  _paginationClick: function (id) {
    console.log("pagination click:" + id)
    this.state.from = id
    this.state.loading = true
    this.setState(this.state)
    this._post()
  },
  componentDidMount: function () {
    this.state.from = this.props.from
    this.state.loading = true
    this.setState(this.state)
    this._post()
  },
  render: function () {
    var content = (function (self) {
      if (self.state.loading === true) {
        return <tbody>
          <tr>
            <td>
              <img width="32" src={self.props.loadingSpin} />
            </td>
          </tr>
        </tbody>
      } else {
        var columns = self.props.columns
        return <tbody>
                {Object.keys(self.state.rows).map(function (index, i) {
                  var row = self.state.rows[index]
                  return (<tr key={i} className="tableSelectedRow" onDoubleClick={self._select.bind(self, row.ID)}>
                {Object.keys(columns).map(function (key, i) {
                  return (<TableCell key={key} value={row[key]}
                    columnType={columns[key].type || "string"}
                  />)
                })}
                    <td>
                      <a className="inline-update" onClick={self._select.bind(self, row.ID)}>&#10004;</a>
                    </td>
                  </tr>)
                })}
        </tbody>
      }
    })(this)
    var self = this
    return <div className="rows">
      <div className="small-12 large-12 medium-12 columns">
        <input type="text" onKeyUp={this._search} placeholder={this.props.searchLabel || "Хайх"}/>
      </div>
      <div className="small-12 large-12 medium-12 columns">
        <Pagination
          size={this.state.size} listFrom={utils.toInt(this.state.from)}
          rowCount={this.props.count} delta={this.props.delta}
          listAddress={this._paginationClick}
          utils = {utils}
        />
      </div>
      <div className="small-12 large-12 medium-12 columns">
        <table>
          <thead>
            <tr>
                        {Object.keys(this.props.columns).map(function (key) {
                          return <td key={key}>{self.props.columns[key].name}</td>
                        })}
              <td>Сонгох</td>
            </tr>
          </thead>
                    {content}
        </table>
      </div>
      <div className="small-12 large-12 medium-12 columns">
        <Pagination
          size={this.state.size} listFrom={utils.toInt(this.state.from)}
          rowCount={this.props.count} delta={this.props.delta}
          listAddress={this._paginationClick}
          utils = {utils}
        />
      </div>
    </div>
  }
})

module.exports = SelectTable