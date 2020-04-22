// TODO


var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

// *** Clothing Route Middlewares / Server-side Validation *** //
function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) {
        return next();
    }

    next(new Error("Invalid ID"));
};

function isValidItem(clothingItem) {
    const hasName = typeof clothingItem.item_name == 'string' && clothingItem.item_name.trim != '';  
    const hasSize = typeof clothingItem.item_size == 'string' && clothingItem.item_size.trim != '';  
    const hasCategory = typeof clothingItem.item_category == 'string' && clothingItem.item_category.trim != '';  
    const hasType = typeof clothingItem.item_type == 'string' && clothingItem.item_type.trim != '';  
    const hasColor = typeof clothingItem.item_color == 'string' && clothingItem.item_color.trim != '';  
    const hasCondition = typeof clothingItem.item_condition == 'string' && clothingItem.item_condition.trim != '';  
    const hasEra = typeof clothingItem.item_era == 'string' && clothingItem.item_era.trim != '';  
    const hasDescription = typeof clothingItem.item_description == 'string' && clothingItem.item_description != '';  
    const hasReworked = typeof clothingItem.item_reworked == 'boolean' && clothingItem.item_reworked != null;  
    const hasBought = typeof clothingItem.item_bought == 'boolean' && clothingItem.item_bought != null;  
    const hasPrice = typeof clothingItem.item_price == 'number' && clothingItem.item_price != null;  

    return hasName && hasSize && hasCategory && hasType && hasColor && hasCondition && hasEra && hasDescription && hasReworked && hasBought && hasPrice; 
};

// *** GET all clothing *** //
router.get('/', (req, res, next) => {
    queries.getAll()
        .then((clothing) => {
            res.status(200).json(clothing);
        })
        .catch(function(error) {
            next(error);
        });
});

// *** GET single clothing item *** //
router.get('/:id', isValidId, (req, res, next) => {
    queries.getSingle(req.params.id)
        .then((item) => {
            res.status(200).json(item);     
        })
        .catch((err) => {
            next(err);
        });
});

// *** POST single clothing item *** //
router.post('/', (req, res, next) => {
    console.log(req.body)
    if(isValidItem(req.body)) {
        queries.addOne(req.body)
           .then((clothingItem) => {
                return queries.getSingle(clothingItem[0]);
            })
            .then((clothing) => {
                res.status(200).json(clothing);
            })
            .catch((err) => {
                next(err);
            });
    } else {
        next(new Error("Invalid clothing item"));
    }
});

// *** PUT single clothing item *** //
router.put('/:id', isValidId,  (req, res, next) => {
    if(req.body.hasOwnProperty('id')) {
        return res.status(422).json({
            error: "You cannot update the id field"
        });
    }
    if(isValidItem(req.body)) {
        queries.updateItem(req.params.id, req.body)
            .then(() => {
                return queries.getSingle(req.params.id);
            })
            .then((clothing) => {
                res.status(200).json(clothing);
            })
            .catch((err) => {
                next(err);
            });
    } else {
        next(new Error("Invalid clothing item"));
    }
});


// *** DELETE single clothig=ng item *** //
router.delete('/:id', isValidId, (req, res, next) => {
    queries.getSingle(req.params.id)
        .then((clothingItem) => {
            queries.deleteItem(req.params.id)
            .then(() => {
                res.status(200).json(clothingItem);
            })
            .catch((err) => {
                next(err);
            });
        })
        .catch((err) => {
            next(err);
        });
})







module.exports = router;
