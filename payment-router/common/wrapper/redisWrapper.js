let redis = require('redis');
let redisClient = redis.createClient();
let Q = require('q');

let client = {
    get: function (key) {
        let deferred = Q.defer();
        redisClient.get(key, function (err, result) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    },
    set: function (key, val) {
        redisClient.set(key, val);
    }
};

module.exports = client;
