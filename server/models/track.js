const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const trackSchema = new mongoose.Schema({
    artist: {
        id: String,
        name: String
    },
    href: String,
    id: String,
    name: String,
    releaseDate: Date
}, {timestamps: true});

module.exports = mongoose.model("Track", trackSchema)