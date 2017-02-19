module.exports = {
    isEmptyObj: function (obj) {
        if (obj == null || obj == undefined) {
            return true;
        }
        return false;
    },
    isEmptyStr: function (str) {
        if (str == null || str == undefined) {
            return true;
        }
        if (typeof str != "string") {
            return false;
        }
        if(str.trim() == ""){
            return true;
        }
        return false;
    },
    isEmptyArray: function (arr) {
        if (arr == null || arr == undefined) {
            return true;
        }
        if(typeof arr != "array"){
            //return false;
            return true;
        }
        if(arr.length == 0){
            return true;
        }
        return false;
    }
};