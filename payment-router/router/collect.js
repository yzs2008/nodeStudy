var router = require('express').Router();
var ruleEngine = require('../core/ruleEngine');
var logger = require('../common/logger')('collect');

router.get('/channel', function (req, res) {
    return ruleEngine.fire(req).then(function (data) {
        logger.info(data);
        res.send(data);
    }).fail(function (err) {
        logger.info(err);
        res.send(err);
    });

});

module.exports = router;
