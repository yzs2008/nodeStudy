var router = require('express').Router();
var ruleEngine = require('../core/ruleEngine');
var logger = require('../common/logger')('collect');

router.get('/channel', function (req, res) {
    ruleEngine.fire(req).then(function (data) {
        res.write(data);
        logger.info(data);
    }).fail(function (err) {
        res.write(err);
        logger.info(err);
    });

});

module.exports = router;
