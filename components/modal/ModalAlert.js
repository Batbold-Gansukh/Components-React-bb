var React = require("react")

var Alert =  React.createClass({
    _closeCallback:function(){
        this.props.closeCallback()
    },
    _escapePress:function(evt){
        if(evt.which === 27)    {
            evt.preventDefault()
            this._closeCallback()
        }
    },
    render:function(){
        var top = (function(self){
            return self.props.topOffset || 0
        })(this) + 97
        return <span >
            <div className="reveal-modal-bg" style={{display:"block"}} onClick={this._closeCallback}></div>
            <div ref="modalDiv"
                style={{position:'fixed',display: "block", opacity: '1', visibility: "visible", top: top+'px'}}
                className="reveal-modal open"
                tabIndex="1" onKeyUp={this._escapePress}>
                <div style={{marginTop:"30px"}}>
                {this.props.inner}
                </div>
                <a onClick={this._closeCallback} className="close-reveal-modal">×</a>
            </div>
        </span>
    }
})

module.exports = Alert