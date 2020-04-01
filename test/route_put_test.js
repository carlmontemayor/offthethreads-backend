// Testing for the PUT route
// Tests /v1/clothing to edt selected clothing item


// TODO
// - Add error handling for when user DOES NOT put in an ID when going to PUT route

// Set PostgreSQL in test environment
process.env.NODE_ENV = 'test';

// Import testing packages
var server = require('../app');
const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

// Import fixtures
const fixtures = require('./fixtures'); 

// Testing PUT /v1/clothing 
describe('PUT /v1/clothing', () => {
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

    // Test PUT a clothing item
    it('should update a single clothing item', (done) => {
        request(server)
            .put('/v1/clothing/1')
            .send(fixtures.changedClothingItemNoId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal(fixtures.changedClothingItem);
                done();
            }).catch((e) => {
                done(e);
            });
    });

    // Test PUT error handling in a clothing item
    it('should not update a single clothing item if id is part of the request', (done) => {
        request(server)
            .put('/v1/clothing/1')
            .send({
                id:20,
                item_color: "black"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .then((res) => {
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.a.property('error');
                expect(res.body.error).to.be.equal('You cannot update the id field');
                done();
            }).catch((e) => {
                done(e);
            });
    });
});


