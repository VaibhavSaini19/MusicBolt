const Track = require("../models/track");
const fetch = require("node-fetch");
const User = require("../models/user");

exports.getTrackById = (req, res, next, id) => {
	fetch(`https://api.spotify.com/v1/tracks/${id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`
		}
	})
		.then(response => {
			response.json().then(data => {
				// console.log(data);
				req.track = getCleanTrack(data);
				// console.log(req.track);
				next();
			});
		})
		.catch(err => console.log(err));
};

exports.getTrack = (req, res) => {
	// console.log("Track: ", req.track);
	return res.json(req.track);
};

exports.getNewTracks = (req, res) => {
	fetch(`https://api.spotify.com/v1/browse/new-releases`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`
		}
	})
		.then(response => {
			response.json().then(data => {
				const tracks = data.albums.items.map(track => getCleanTrack(track));
				res.status(200).json(tracks);
			});
		})
		.catch(err => console.log(err));
};

exports.getFeaturedTracks = (req, res) => {
	fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`
		}
	})
		.then(response => {
			response.json().then(data => {
				const tracks = data.albums.items.map(track => getCleanTrack(track));
				res.status(200).json(tracks);
			});
		})
		.catch(err => console.log(err));
};

exports.getUserFavourites = (req, res) => {
	User.findById(req.profile._id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found in DB"
			});
		}
		user.salt = undefined;
		user.encry_password = undefined;
		user.createdAt = undefined;
		user.updatedAt = undefined;
		res.status(200).json(user);
	});
};

const getCleanTrack = track => {
	const cleanTrack = {
		artist: track.artists[0].name,
		duration: Math.round(track.duration_ms / 1000),
		id: track.id,
		name: track.name,
		image: track.images[1].url
	};
	return cleanTrack;
};
