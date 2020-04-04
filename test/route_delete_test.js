// Testing for the DELETE route
// Tests /v1/clothing/:id to delete selected clothing item


// TODO

// Set PostgreSQL in test environment
process.env.NODE_ENV = 'test';

// Import testing packages
var server = require('../app');
const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

// Import fixtures
const fixtures = require('./fixtures'); 

// Testing DELETE /v1/clothing 
describe('DELETE /v1/clothing/:id', () => {
    // Get latest migration and update database
    beforeEach((done) => {
        // Run migrations
        knex.migrate.latest()
            .then(() => {
                // Run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    afterEach((done) => {
        // Rollback migrations
        knex.migrate.rollback()
            .then(() => {
                done();
            });
    });

    // Test DELETE a clothing item
    it('should delete a single clothing item', (done) => {
        request(server)
            .delete('/v1/clothing/1')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal(fixtures.clothing[0]);
                done();
            }).catch((e) => {
                done(e);
            });
    });

});


