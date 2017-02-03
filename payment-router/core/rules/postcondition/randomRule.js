
module.exports = function (request, routerInfo) {
    if(routerInfo.length == 1){
        return routerInfo;
    }

    var randomIndex = 1;
    return routerInfo[randomIndex];
}
