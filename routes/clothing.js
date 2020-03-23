// TODO
// - Create server-side validation for id param
// - finish POST route


var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

// *** Clothing Route Middlewares / Server-side Validation *** //
function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) {
        console.log(req.params.id)
        return next();
    }

    next(new Error("Invalid ID"));
};


// *** GET all clothing *** //
router.get('/clothing', (req, res, next) => {
    queries.getAll()
        .then((clothing) => {
            res.status(200).json(clothing);
        })
        .catch(function(error) {
            next(error);
        });
});

// *** GET single clothing item *** //
router.get('/clothing/:id', isValidId, (req, res, next) => {
    queries.getSingle(req.params.id)
        .then((item) => {
            res.status(200).json(item);     
        })
        .catch((err) => {
            next(err);
        });
});

// *** POST single clothing item *** //
router.get('/clothing', async (req, res, next) => {
    res.json({
        message: "hello posts"
    });
});

module.exports = router;
