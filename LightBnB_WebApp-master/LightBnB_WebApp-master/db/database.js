//require the pool
const pool = require('./index.js');

/**
* Get a single user from the database given their email.
* @param {String} email The email of the user.
* @return {Promise<Object[]>} A promise to the user.
*/
const getUserWithEmail = function(email) {
  return pool
  .query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `,[email])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => console.error(err.message));
};


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<Object[]>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`
  SELECT *
  FROM users
  WHERE users.id = $1;
  `,[id])
  .then(res => {
    return res.rows[0];
  })
  .catch(err => console.error(err.message));
};


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<Object[]>} A promise to the user.
 */
const addUser = function(user) {
  return pool
  .query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3) RETURNING *;
  `,[user.name, user.email, user.password])
  .then(res => {
    const newUser = res.rows[0];
    return newUser;
  })
  .catch(err => console.error(err.message));
};


/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<Object[]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id) {
  return pool
  .query(`
  SELECT properties.*,
  AVG(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id=properties.id
  JOIN property_reviews ON properties.id=property_reviews.property_id
  WHERE reservations.guest_id=$1
  GROUP BY reservations.id,properties.id 
  ORDER BY start_date
  LIMIT 10;
`,[guest_id])
.then(res => {
  return res.rows;
})
.catch(err => console.error(err.message));
};


/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.(Search feature)
 * @param {*} limit The number of results to return.
 * @return {Promise<Object[]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `; 
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  } 
  if (options.owner_id) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push(options.owner_id);
    queryString += `properties.owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push((options.minimum_price_per_night) * 100);
    queryString += `properties.cost_per_night >= $${queryParams.length}`;
  }
  if ((options.maximum_price_per_night)) {
    !queryParams.length ? (queryString += `WHERE `) : (queryString += `AND `);
    queryParams.push((options.maximum_price_per_night) * 100);
    queryString += `properties.cost_per_night < $${queryParams.length}`;
  }

  queryString += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) > $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  return pool.query(queryString, queryParams).then((res) => res.rows);
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
*/
const addProperty = function(property) {
  return pool
  .query(`
  INSERT INTO properties (owner_id, title, description,thumbnail_photo_url,
  cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,
  country,street,city,province,post_code)

  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
`,[property.owner_id, property.title, property.description, property.thumbnail_photo_url,
  property.cover_photo_url, property.cost_per_night * 100,property.parking_spaces,
  property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street,
  property.city, property.province, property.post_code])
.then(res => {
  return res.rows;
})
.catch(err => console.error(err.message));
};


module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

