const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getTrackById, getTrack, getAllTracks } = require("../controllers/spotify");

// ----------------------------             Tracks
router.param("trackId", getTrackById);

router.get("/track/all", isSignedIn, isAuthenticated, getAllTracks);
router.get("/track/:trackId", isSignedIn, isAuthenticated, getTrack);



module.exports = router;
