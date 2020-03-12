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

app.get('/', (req, res) =>
  res.json({
    title: 'Songs App',
    songs
  })
);

app.use('/api/', require('./routes/index'));

// Listen to req
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at Port ${PORT}`));