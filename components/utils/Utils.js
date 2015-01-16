var _ = require('lodash')

var utils = {
    toInt(x) {
        x = parseInt(x)
        if (x === parseInt(x, 10) && x !== 0) return x
        return 1
    },
    max(a, b) {
        return a > b ? a : b
    },
    min(a, b) {
        return a > b ? b : a
    },
    paginationSize(size, rowCount) {
        return parseInt(size / rowCount) + (size % rowCount > 0 ? 1 : 0)
    },
    clearTimezone(date) {
        //return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
        return date
    },
    isInt(value) {
        try {
            parseInt(value)
        } catch (e) {
            return false
        }
        return true
    },
    formatDate(value) {
        var date = utils.isInt(value) ? new Date(value) : value
        var yyyy = date.getFullYear();
        var mm = date.getMonth() + 1 //January is 0!
        var dd = date.getDate()

        if (parseInt(yyyy) !== yyyy || parseInt(mm) !== mm || parseInt(dd) !== dd)
            return ""

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        return yyyy + '/' + mm + '/' + dd
    },
    formatDatetime(value) {
        //return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
        var date = _.isNumber(value) ? new Date(value) : value
        var HH = date.getHours()
        var m = date.getMinutes()

        if (parseInt(HH) !== HH || parseInt(m) !== m)
            return ""


        if (HH < 10) {
            HH = '0' + HH
        }
        if (m < 10) {
            m = '0' + m
        }
        return utils.formatDate(date) + " " + HH + ":" + m
    }

}

module.exports = utils