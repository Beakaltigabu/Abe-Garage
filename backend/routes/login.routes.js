const express = require("express");
const Router = express.Router(); // Create an instance of the Express router

// Import controller functions
const { logInHandler } = require("../controllers/login.controller");

// Route to log in a user
Router.post("/api/login", logInHandler);

module.exports = Router; // Export the router to be used in other parts of the application
