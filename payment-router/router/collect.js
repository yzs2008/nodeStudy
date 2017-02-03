var router = require('express').Router();
var collectionService = require('../core/services/collectService');

router.get('/channel', function (req, res) {
    var filter = {};
    var promise = collectionService.getRouterInfo(filter);
    promise
        .then(function (data) {
            resUtil.error(res);
        })
        .fail(function (err) {
            resUtil.error(res);
        });

});

module.exports = router;
