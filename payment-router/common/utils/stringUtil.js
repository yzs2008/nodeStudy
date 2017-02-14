module.exports = {
    isEmpty: function (str) {
        if (str == null || str == undefined) {
            return true;
        }
        if (typeof str != "String") {
            return false;
        }
        if(str.trim() == ""){
            return true;
        }
        return false;
    }
};