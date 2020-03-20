// Dependency exports
var express = require('express');
var cors = require('cors');
var app = express();
var logger = require('morgan')

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 5000));

// Routes
app.get('/', function(req, res) {
    res.send('hello world');
});

// Initialize server
app.listen(app.get('port'), function() {
    console.log("running")
});
