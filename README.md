# buffered-stathat

A buffering utility for stathat

```
npm install buffered-stathat
```

```
var bufferedStarthat = require('buffered-stathat');

var account = "test@example.com";
stathat = bufferedStathat(account, {
  prefix: "example",
  interval: 60 * 1000
});

stathat.count('count', 1);
stathat.count('count', 1);
stathat.count('count', 1);

stathat.value('value', 100);
stathat.value('value', 100);
stathat.value('value', 100);
```
