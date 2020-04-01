// TODO
// - Finish addOne functionality using knex.js

// Import Knex object
var knex = require('./knex.js');


function Clothing() {
    return knex('clothing');
}

// *** QUIERIES *** //

// GET Queries 
function getAll() {
    return Clothing().select();
}

function getSingle(clothingId) {
    return Clothing().where('id', clothingId).first();
}

// POST Queries
function addOne(clothingItem) {
    return Clothing().insert(clothingItem, 'id');
}

// PUT Queries
function updateItem(clothingId, clothingItem) {
    return Clothing().where('id', clothingId).update(clothingItem, "*");
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  addOne: addOne,
  updateItem: updateItem
};
