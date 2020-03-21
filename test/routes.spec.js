// Testing for the GET route
// add proper npm test script with dropping and creating new database
// Finish creating test for getting all clothing

// Set PostgreSQL in test environment
process.env.NODE_ENV = 'test';

// Import testing packages
var server = require('../app');
const request = require('supertest');
const knex = require('../db/knex');

// Testing start
describe('Get all clothing', () => {
    // Get latest migration and update database
    before((done) => {
        // Run migrations
        knex.migrate.latest()
            .then(() => {
                // Run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    // Test GET all clothing
    it('lists all clothing', (done) => {
        request(server)
            .get('/v1/clothing')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
