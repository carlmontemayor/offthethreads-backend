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
function addOne() {
    return Clothing().returning(['id', 'item_name']).insert({});
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle
};
