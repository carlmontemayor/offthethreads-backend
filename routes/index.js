var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

/*** Middleware functions to validate multiform data ***/
function isTrueOrFalse(bool) {
    if(bool === "true") {
        return bool === "true";
    }
    else return bool === "false";
}

/*** GET Render the Pug view for the dashboard ***/
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    const obj = JSON.parse(JSON.stringify(req.body));

    obj.item_reworked = isTrueOrFalse(obj.item_reworked);
    obj.item_bought = isTrueOrFalse(obj.item_bought);
    obj.item_price = Number.parseInt(obj.item_price, 10);
    
    queries.addOne(obj)
        .then((clothing) => {
            res.status(200).render('index');
        })
        .catch((err) => {
            next(err);
        })
});


module.exports = router;
