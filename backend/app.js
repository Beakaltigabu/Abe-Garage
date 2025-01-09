// Import the express module
const express = require("express");

const { pool } = require("./config/db.config");

// Import the dotenv module and call the config method to load the environment variables

require('dotenv').config();


// Import the sanitizer module
const sanitize = require("sanitize");
// Import the CORS module
const cors = require("cors");
// Set up the CORS options to allow requests from our front-end

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
// Create a variable to hold our port number
const port = process.env.PORT;

// Import the router
const router = require("./routes");
// Create the webserver
const app = express();
// Add the CORS middleware
app.use(cors());
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
// Add the routes to the application as middleware
app.use(router);

async function starter() {
  try {
    // Execute a test query to ensure the database connection is working.
    await pool.execute("SELECT 'test Approved'");
    // Start the server on the specified port (from .env) or default to port 3000.
    await app.listen(process.env.PORT || 3000);
    // Log a message indicating that the database connection is established.
    console.log(`Your Database connection is established`);
    // Log a message indicating that the server is listening on the specified port.
    console.log(`Your server is listening @ port Number ${process.env.PORT}`);
  } catch (err) {
    // If an error occurs, log the error message.
    console.log(err.message);
  }
}
// Call the starter function to initiate the server and database connection.
starter();

module.exports = app;
