var React = require('react')
var Link = require('react-router').Link
var _ = require("lodash")

var PaginationLink = React.createClass({
    render: function () {
        var listAddress = this.props.listAddress
        var index = this.props.index
        var par = _.merge(_.clone(this.props.betParams) || {}, {efrom: index})
        var text = this.props.text || index

        return <span>{(typeof(listAddress) === "function") ? (
            <a onClick={listAddress.bind(null, index)}>{text}</a>
        ) : (
            <Link to={listAddress} className="paginationLink" params={par}>{text}</Link>
        )}</span>
    }
})

var Pagination = React.createClass({
    render: function () {
        var size = this.props.size
        var listFrom = this.props.utils.toInt(this.props.listFrom)
        var rowCount = this.props.rowCount
        var delta = this.props.delta
        var paginationSize = this.props.utils.paginationSize(size, rowCount)
        if (size === undefined || listFrom === undefined || rowCount === undefined || delta === undefined || paginationSize === undefined) {
            return null
        }
        //console.log("Pagination:"+size+" "+listFrom+" "+rowCount+" "+delta+" "+paginationSize)
        var PaginationHTML = (function (self) {
            var addPaginationLink = function (fr, to, curr) {
                var temp = []
                for (var i = fr; i <= to; i++) {
                    temp.push(
                        <li key={i} className={i == curr ? "current" : ""}>
                            <PaginationLink listAddress={self.props.listAddress} index={i} betParams={self.props.betParams} />
                        </li>
                    )
                }
                return temp
            }
            var addPaginationImplicit = function (key) {
                return (<li key={key} className="unavailable">
                    <a>&hellip;</a>
                </li>)
            }

            var innerHTML = []
            innerHTML.push(addPaginationLink(1, 1, listFrom))
            if (listFrom - delta - 1 > 1) innerHTML.push(addPaginationImplicit("imp1"))
            innerHTML.push(addPaginationLink(self.props.utils.max(2, listFrom - delta), self.props.utils.min(listFrom + delta, paginationSize - 1), listFrom))
            if (listFrom + delta + 1 < paginationSize) innerHTML.push(addPaginationImplicit("imp2"))
            if (paginationSize > 1)
                innerHTML.push(addPaginationLink(paginationSize, paginationSize, listFrom))

            return (
                <ul className="pagination">
                    <li key="leftArrow" className={"arrow " + (listFrom == 1 ? "unavailable" : "")}>
                        <PaginationLink  listAddress={self.props.listAddress}
                            index={self.props.utils.max(1, listFrom - 1)} text={"\u00ab"} betParams={self.props.betParams}/>
                    </li>

                    {innerHTML}
                    <li key="rightArrow" className={"arrow " + (listFrom == paginationSize ? "unavailable" : "")}>
                        <PaginationLink  listAddress={self.props.listAddress}
                            index={self.props.utils.min(paginationSize, listFrom + 1)} text={"\u00bb"}
                            betParams={self.props.betParams}/>
                    </li>

                </ul>
            )
        })(this)
        return (
            <span>
            {PaginationHTML}
            </span>
        )
    }
})

module.exports = Pagination