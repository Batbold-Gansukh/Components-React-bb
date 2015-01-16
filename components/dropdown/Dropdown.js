var React = require('react')

var Dropdown = React.createClass({
    propTypes:{
        left: React.PropTypes.number,
        top:React.PropTypes.number,
        closeCallback:React.PropTypes.func,
        commitCallback:React.PropTypes.func,
        content:React.PropTypes.element
    },
    render: function () {
        var top = this.props.top
        var left = this.props.left
        return <div className="panel"
            style={{position: "absolute", left: left + "px", top: top + "px"}}>
            <div className="dropdown-arrow"></div>
            <div className="row">
                <div className="dropdownContent large-10 small-10 medium-10 columns">
                {this.props.content}
                </div>
                <div className="large-2 small-2 medium-2 columns">
                    {(this.props.closeCallback !== undefined) ?
                        <span className="inline-cancel" onClick={this.props.closeCallback}>&#x2717;</span> : ""}
                </div>
                <div className="large-8 small-8 medium-8 columns"> </div>
                <div className="large-1 small-1 medium-1 columns">
                {(this.props.commitCallback !== undefined) ?
                    <span onClick={this.props.commitCallback} className="inline-update">&#10004;</span> : ""}
                </div>
                <div className="large-1 small-1 medium-1 columns">

                </div>
                <div className="large-2 small-2 medium-2 columns"></div>
            </div>
        </div>
    }
})

module.exports = Dropdown