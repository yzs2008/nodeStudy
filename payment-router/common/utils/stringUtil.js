module.exports = {
    isEmpty: function (str) {
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
    }
};