var mysql = require('mysql');
var config = require('../config');
var Q = require('q');

var pool = mysql.createPool(config.mysqlConfig);

module.exports = {
    queryOne: function (queryString, paramObj) {
        var deferred = Q.defer();

        pool.getConnection(function (err, connection) {
            connection.query(queryString, paramObj, function (err, results) {
                connection.release();
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(results);
            });
        });

        return deferred.promise;
    },
    queryList: function (queryString, paramObj) {
        var deferred = Q.defer();
        pool.getConnection(function (err, connection) {
            connection.query(queryString, paramObj, function (err, results) {
                connection.release();
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(results);
            })
        })
        return deferred.promise;
    }
};
