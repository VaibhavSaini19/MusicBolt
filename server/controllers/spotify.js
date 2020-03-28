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
				// console.log(data)
				req.track = getCleanTrack(data);
				next();
			});
		})
		.catch(err => console.log(err));
};

exports.getTrack = (req, res) => {
	console.log("Track: ", req.track);
	return res.json(req.track);
};

exports.getAllTracks = (req, res) => {
	fetch(`	https://api.spotify.com/v1/tracks`)
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json(err));
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "You are not authorized for this action"
				});
			}
			user.salt = undefined;
			user.encry_password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;
			res.json(user);
		}
	);
};


const getCleanTrack = (track) => {
	const cleanTrack = {
		artist: track.artists[0].name,
		duration: Math.round(track.duration_ms/1000),
		id: track.id,
		name: track.name
	}
	return cleanTrack;
}