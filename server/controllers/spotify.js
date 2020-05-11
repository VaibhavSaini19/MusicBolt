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

exports.getNewTracks = async (req, res) => {
	let limit=20, artists = [], tracksList = [];
	let responseArtist = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`
		}
	});
	responseArtist = await responseArtist.json();
	responseArtist.albums.items.forEach(item => artists.push([item.artists[0].id, item.available_markets.includes("IN")?"IN":"US"]));
	artists.forEach(async (artist, ind) => {
		let responseTrack = await fetch(`https://api.spotify.com/v1/artists/${artist[0]}/top-tracks?country=${artist[1]}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`
			}
		});
		responseTrack = await responseTrack.json();
		// responseTrack.tracks.forEach(track => tracksList.push(getCleanTrack(track)));
		tracksList.push(getCleanTrack(responseTrack.tracks[0]));
		if(ind == limit-1){
			res.status(200).json(tracksList);
		}
	})
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

exports.getSearchQueryResults = (req, res) => {
	let url = new URL(`https://api.spotify.com/v1/search`)
	let params = {q: req.query.q, type: 'track'};
	url.search = new URLSearchParams(params).toString();
	// console.log(url)
	fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`
		}
	})
		.then(response => {
			response.json().then(data => {
				if (data && data.tracks){
					let l = data.tracks.items.length;
					let results = [];
					data.tracks.items.forEach((item, index) => {
						results.push(item.id);
						if(index == l-1)
							res.status(200).json(results);
					});
				}else{
					return res.status(500).json({error: 'Server error'});
				}
			});
		})
		.catch(err => console.log(err));
};

const getCleanTrack = track => {
	// console.log(track);
	try{
		const cleanTrack = {
			artist: track.artists[0].name,
			duration: Math.round(track.duration_ms / 1000),
			id: track.id,
			name: track.name,
			image: track.album.images[1].url
		};
		return cleanTrack;
	} catch (e){
		return;
	}
};
