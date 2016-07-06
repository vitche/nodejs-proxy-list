var proxyQueueClient = require('nodejs-proxy-queue-client');
module.exports.Storage = function () {
    var self = this;
    self.find = function (conditions, projection, options, callback) {
        // Connect to the proxy queue
        var client = new proxyQueueClient();
        client.connect(function (error) {
            if (undefined != error) {
                callback(error);
                return;
            }
            // Build a Mongoose query
            var query = {};
            if (conditions) {
                query.conditions = conditions;
            }
            if (projection) {
                query.projection = projection;
            }
            if (options) {
                query.options = options;
            }
            // Subscribe to status corresponding to this query
            client.proxy.list.subscribeStatus(function (error, data) {
                if (JSON.stringify(query) === JSON.stringify(data.query)) {
                    callback(error, data.data);
                    client.disconnect();
                    delete client;
                }
            });
            client.proxy.list.publish(query);
        });
    };
    return self;
};