var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

router.get('/', function(req, res) {
    queries.getAll()
        .then((clothing) => {
            res.status(200).render('inventory', { clothing: clothing});
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
