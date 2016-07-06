var main = require('../main');
module.exports = {
    testSimpleFind: function (test) {
        var storage = new main.Storage();
        storage.find({}, {}, {
            skip: 5,
            limit: 5
        }, function (error, data) {
            test.ok(undefined == error, 'storage-find should not return error');
            test.ok(data instanceof Array, 'storage-find should return array of data');
            test.done();
        });
    }
};