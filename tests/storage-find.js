var main = require('../main');
module.exports = {
    testSimpleFind: function (test) {
        var storage = new main.Storage();
        storage.find({
            type: 2 // HTTPS
        }, {
            __v: false,
            _id: false,
            type: false
        }, {
            skip: 5,
            limit: 5
        }, function (error, data) {
            test.ok(undefined == error, 'storage-find should not return error');
            test.ok(data instanceof Array, 'storage-find should return array of data');
            test.done();
        });
    }
};