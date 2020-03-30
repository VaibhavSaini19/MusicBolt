const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const trackSchema = new mongoose.Schema({
    artist: String,
    duration: Number,
    id: String,
    name: String,
    image: String
}, {timestamps: true});

module.exports = mongoose.model("Track", trackSchema)