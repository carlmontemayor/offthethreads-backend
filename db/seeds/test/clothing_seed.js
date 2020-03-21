// Populate initial data into database in test

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('clothing').del() 
        // Inserts seed entries one by one in series
        .then(function() { 
            return knex('clothing').insert({
                item_name: 'Ski Jacket',
                item_size: 'S',
                item_category: 'outerwear',
                item_type: 'womens',
                item_color: 'blue',
                item_condition: 'perfect',
                item_era: '00',
                item_description: 'Vintage Primary Colored Bogner Ski Jacket.',
                item_reworked: false,
                item_bought: false,
                item_price: 80.00
            });
        }).then(function () {
            return knex('clothing').insert({
                item_name: 'Black Suede Bomber Jacket',
                item_size: 'M',
                item_category: 'jacket',
                item_type: 'mens',
                item_color: 'black',
                item_condition: 'good',
                item_era: '00',
                item_description: 'Shell is 100% genuine leather suede. Cropped in the body for a great fit and elastic banding is in great condition and not overstretched.',
                item_reworked: false,
                item_bought: false,
                item_price: 31.50
            });
        }).then(function () {
            return knex('clothing').insert({
                item_name: 'Vintage Striped Pocket Sweater',
                item_size: 'M',
                item_category: 'sweater',
                item_type: 'womens',
                item_color: 'green',
                item_condition: 'good',
                item_era: '00',
                item_description: 'Vintage green striped sweater with pocket detailing // Made in Singapore .',
                item_reworked: false,
                item_bought: false,
                item_price: 30.00
            });
        }).then(function () {
            return knex('clothing').insert({
                item_name: 'Vintage Strawberry Fest Tee',
                item_size: 'XL',
                item_category: 't-shirt',
                item_type: 'mens',
                item_color: 'black',
                item_condition: 'good',
                item_era: '90',
                item_description: 'Vintage Faded Black Strawberry Fest Tee with distressed neckline 🍓 // slight stain on front',
                item_reworked: false,
                item_bought: false,
                item_price: 25.00
            });
        }).then(function () {
            return knex('clothing').insert({
                item_name: 'Repurposed Two Piece Nike Set',
                item_size: 'M',
                item_category: 'reworked',
                item_type: 'womens',
                item_color: 'blue',
                item_condition: 'perfect',
                item_era: '00',
                item_description: 'Custom two piece set. Straps left long to cut at desired length.',
                item_reworked: true,
                item_bought: false,
                item_price: 60.00
            });
        });
};

