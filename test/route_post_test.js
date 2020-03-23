// Testing for the POST route
// Tests /v1/clothing to return all clothes

// Set PostgreSQL in test environment
process.env.NODE_ENV = 'test';

// Import testing packages
var server = require('../app');
const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

// Import fixtures
const fixtures = require('./fixtures'); 

// Testing POST /v1/clothing 
describe('POST /v1/clothing', () => {
    // Get latest migration and update database
    before((done) => {
        // Run migrations
        knex.migrate.latest()
            .then(() => {
                // Run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    // Test POST a clothing item
    it('should add a single clothing item', (done) => {
        request(server)
            .post('/v1/clothing')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('array');
                expect(res.body).to.deep.equal(fixtures.clothing);
                done();
            }).catch((e) => {
                done(e);
            });
    });

});


