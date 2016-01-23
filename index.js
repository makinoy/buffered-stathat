var _ = require('lodash');
var stathat = require('stathat');

module.exports = (account, options) => {

    if (!options) {
        options = {};
    }

    var prefix_ = options.prefix;
    const interval = options.interval || 60 * 1000;
    const mock = options.mock || false;

    if (options.prefix) {
        prefix_ = options.prefix + "_"
    }

    var countCache = {};
    var valuesCache = {};

    var sendTimeout = null;
    var checkBuffer = () => {
        if (!sendTimeout) {
            sendTimeout = setTimeout(() => {
                sendBuffer();
                sendTimeout = null;
            }, interval);
        }
    };

    var sendBuffer = () => {

        var counts = countCache;
        countCache = {};

        var values = valuesCache;
        valuesCache = {};

        _.keys(counts).forEach((key) => {
            const count = counts[key];
            if (mock) {
                console.log(account, prefix_ + key, count);
                return;
            }
            stathat.trackEZCount(account, prefix_ + key, count, () => {});
        });

        _.keys(values).forEach((key) => {
            const value = values[key];
            if (value != null) {
                if (mock) {
                    console.log(account, prefix_ + key, value.sum / value.num);
                    return;
                }
                stathat.trackEZValue(account, prefix_ + key, value.sum / value.num, () => {});
            }
        });
    };

    return {

        count : (id, count) => {
            if (isNaN(count)) {
                count = 1;
            }
            var old = countCache[id];
            if (old == null) {
                old = 0
            }
            countCache[id] = old + count;
            checkBuffer();
        },

        value: (id, value) => {
            if (isNaN(value)) {
                console.error('"value" must be a number. key:', prefix_ + id, "value:", value);
                return;
            }
            var old = valuesCache[id];
            if (old == null) {
                old = {
                    sum: 0,
                    num: 0
                };
            }
            old.sum += value;
            old.num++;
            valuesCache[id] = old;
            checkBuffer();
        },
    }
};

