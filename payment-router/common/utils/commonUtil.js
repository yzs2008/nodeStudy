module.exports = {
    isEmptyObj: function (obj) {
        if (obj == null || obj == undefined) {
            return true;
        }
        return false;
    },
    isEmptyStr: function (str) {
        return emptyStr(str);
    },
    isNotEmptyStr: function (str) {
        return !emptyStr(str);
    },
    isEmptyArray: function (arr) {
        if (arr == null || arr == undefined) {
            return true;
        }
        if (arr.length == 0) {
            return true;
        }
        return false;
    }
};

let emptyStr = function (str) {
    if (str == null || str == undefined) {
        return true;
    }
    if (str == "" || str.trim() == "") {
        return true;
    }
    return false;
};