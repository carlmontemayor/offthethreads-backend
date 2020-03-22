var express = require('express');
var router = express.Router();

var queries = require('../db/queries');


// *** GET all shows *** //
router.get('/clothing', (req, res, next) => {
    queries.getAll()
        .then((clothing) => {
            res.status(200).json(clothing);
        })
        .catch(function(error) {
            next(error);
        });
});


module.exports = router;
