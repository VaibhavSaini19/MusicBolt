/* Load the HTTP library */
const express = require('express');
const http = require("http");
const songs = require('./Songs');

const logger = require('./middleware/logger')

/* Create an HTTP server to handle responses */

const app = express();

//Init middleware
app.use(logger);

// Define routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes:
// Home
app.use('/', require('./routes/index'));
// Users
app.use('/users', require('./routes/users'));
// Spotify API, 
app.use('/songs/', require('./routes/songs'));

// Listen to req
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at Port ${PORT}`));