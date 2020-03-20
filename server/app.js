/* Load the HTTP library */
const express = require('express');
const http = require("http");
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const songs = require('./Songs');

const logger = require('./middleware/logger')


/*--------------------------------Create an HTTP server to handle responses--------------------------------*/
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

const app = express();

// Init middleware
app.use(logger);

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Bodyparser
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