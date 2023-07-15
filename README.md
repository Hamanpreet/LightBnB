# LightBnB: ✨ Your Gateway to Unforgettable Vacations ✈️
Welcome to LightBnB, the groundbreaking app set to revolutionize the travel industry. Prepare to embark on an extraordinary journey where homeowners become hosts, travelers become adventurers, and vacations become unforgettable experiences.

## Discover the Power of LightBnB 🌟
- Homeowner Registration: Homeowners can sign up and create an account to list their properties on LightBnB. They can provide details about their homes, upload photos, and set availability for renting.

- Traveler Search: Travelers can search for available properties based on their desired location, travel dates, price & ratings. LightBnB will provide a list of suitable options with detailed property information and photos.

- Booking and Reservations: Travelers can make bookings and reservations directly through the LightBnB platform.


## Embark on Your LightBnB Adventure Today 🚀
Dependencies:

- bcrypt 🔒: Safeguarding your data with advanced password hashing techniques.
- cookie-session 🍪: Secure session management with encrypted cookies.
- express 🚀: The powerhouse web application framework that powers LightBnB.
- nodemon 🔄: Fueling your development process with automatic server restarts, keeping you in the flow.

## Getting Started
1. Clone the repository.
2. `npm install` to install the required dependencies.
3. Set up the database:
* `create database lightbnb`.
* \c lightbnb
* Configure the database connection in the project's configuration files `\i migrations/01_schema.sql`.(same for seeds)
4. `npm run local` to start the server.
5. Open your web browser and access LightBnB at `http://localhost:3000`

## Project Structure
* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

## Final Product
![Image of the main page](/screenshots/Screenshot%20(208).png)

## Join the LightBnB Community 🤝
We value your feedback! If you encounter any issues or have suggestions for improvement, please open an issue on the project repository.

For additional support or inquiries, please contact our team at haman42626@gmail.com.

