// Testing for the GET route
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

// Testing GET /v1/clothing 
describe('GET /v1/clothing', () => {
    // Get latest migration and update database
    before((done) => {
        // Run migrations
        knex.migrate.latest()
            .then(() => {
                // Run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    after((done) => {
        // Rollback migrations
        knex.migrate.rollback()
            .then(() => {
                done();
            });
    });

    

    // Test GET all clothing
    it('lists all clothing', (done) => {
        request(server)
            .get('/v1/clothing')
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

    // Test GET single clothing item
    it('lists clothing item', (done) => {
        request(server)
            .get('/v1/clothing/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object');        
                expect(res.body).to.deep.equal(fixtures.clothing[1]);
                done();
            }).catch((e) => {
                done(e);
            });
    });
});


