//To interact with postgres database
//separate the database connection logic to this file
const { Pool } = require('pg');

/**
 * Pool allows multiple clients simultaneously preferred
 */
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = pool;