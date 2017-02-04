var router = require('express').Router();
var ruleEngine = require('../core/ruleEngine');

router.get('/channel', function (req, res) {
    ruleEngine.fire(req);

});

module.exports = router;
