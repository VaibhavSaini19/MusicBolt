/* Load the HTTP library */
const express = require('express');
const http = require("http");
const mongoose = require('mongoose');
const cors = require('cors');
const songs = require('./Songs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const db = require('./config/keys').MongoURI;

const logger = require('./middleware/logger')


/*--------------------------------Create an HTTP server to handle responses--------------------------------*/
// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

const app = express();

// Init middlewares
app.use(logger);                    // Logger
app.use(cors());                    // CORS

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