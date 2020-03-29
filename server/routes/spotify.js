const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getTrackById, getTrack, getNewReleasesTracks } = require("../controllers/spotify");

// ----------------------------             Tracks
router.param("trackId", getTrackById);

router.get("/track/new", isSignedIn, getNewReleasesTracks);
router.get("/track/:trackId", isSignedIn, getTrack);



module.exports = router;
