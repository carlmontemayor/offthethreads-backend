//Create and Drop table functions

exports.up = function(knex, Promise) {
    return knex.schema
      .createTable('clothing', function(table){
          table.increments();
          table.string('item_name').notNullable();
          table.string('item_size').notNullable();
          table.string('item_category').notNullable();
          table.string('item_type').notNullable();
          table.string('item_color').notNullable();
          table.string('item_condition').notNullable();
          table.string('item_era').notNullable();
          table.text('item_description').notNullable();
          table.boolean('item_reworked').notNullable();
          table.boolean('item_bought').notNullable();
          table.float('item_price', 5, 2).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clothing');
};
