var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(app.get('port'), function() {
    console.log("running")
});
