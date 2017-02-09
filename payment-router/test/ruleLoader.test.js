var chai = require('chai');
var should = chai.should();
var ruleLoader = require('../core/ruleLoader');

describe('rule loader', function () {
    it('should load all rules.', function () {
        ruleLoader.init();
        //g.ruleCollection.should.be.a('object');
        //g.ruleCollection.should.have.all.keys('postcondition', 'precondition', 'priority');
        //g.ruleCollection.should.have.deep.property('precondition[1]', 'queryChannelRule');
    })
});

describe('loader one rules', function () {
        ruleLoader.init();
        //g.ruleCollection.should.be.a('object');
});
