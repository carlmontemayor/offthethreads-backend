// Import Knex object
var knex = require('./knex.js');


function Clothing() {
  return knex('clothing');
}

// *** queries *** //

function getAll() {
  return Clothing().select();
}


module.exports = {
  getAll: getAll
};
