const Song = require("../models/track");
const fetch = require("node-fetch");

exports.getTrackById = (req, res, next, id) => {
	fetch(`https://api.spotify.com/v1/tracks/${id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			'Content-Type': "application/json",
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

exports.getNewReleasesTracks = (req, res) => {
	fetch(`https://api.spotify.com/v1/browse/new-releases`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			'Content-Type': "application/json",
			Authorization: `Bearer ${access_token}`
		}
	})
		.then(response => {
			response.json().then(data => {
				// const tracks = data.albums.items.forEach((track => getCleanTrack(track.albums)))
				res.status(200).json(data.albums.items.map(track => getCleanTrack(track)))
			})
		})
		.catch(err => console.log(err));
};


const getCleanTrack = (track) => {
	const cleanTrack = {
		artist: track.artists[0].name,
		duration: Math.round(track.duration_ms/1000),
		id: track.id,
		name: track.name,
		image: track.images[1].url
	}
	return cleanTrack;
}