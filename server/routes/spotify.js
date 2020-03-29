const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getTrackById, getTrack, getNewTracks, getFeaturedTracks } = require("../controllers/spotify");

// ----------------------------             Tracks
router.param("trackId", getTrackById);

router.get("/track/new", isSignedIn, getNewTracks);
router.get("/track/featured", isSignedIn, getFeaturedTracks);
router.get("/track/:trackId", isSignedIn, getTrack);



module.exports = router;
