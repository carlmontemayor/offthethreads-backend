// Update with your config settings.

require('dotenv').config();

var pg = require('pg');
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production')
{
    pg.defaults.ssl = true; 
}


module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/off_the_threads_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/off_the_threads',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
