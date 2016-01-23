var bufferedStathat = require('../');

module.exports = {

    setUp: (done) => {
        this.stathat = bufferedStathat("test@example.com", {
            prefix: "prefix",
            interval: 100,
            mock: true
        });
        done();
    },

    tearDown: (done) => {
        done();
    },

    test1: (test) => {
        this.stathat.count('a', 100);
        this.stathat.count('b', 100);
        this.stathat.count('c', 100);
        this.stathat.count('d', 1);
        this.stathat.count('a', 200);
        this.stathat.count('d', 1);
        test.done();
    },

    test2: (test) => {
        this.stathat.value('a', 100);
        this.stathat.value('b', 100);
        this.stathat.value('c', 100);
        setTimeout(() => {
            this.stathat.value('a', 200);
            this.stathat.value('a', "value");
            test.done();
        }, 1000);
    }
}