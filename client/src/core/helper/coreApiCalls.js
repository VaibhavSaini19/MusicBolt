import React from "react";
import { API } from "../../backend";

export const addToFavourites = (user, token, track, rating) => {
	let bodyData, newTrack = { ...track, rating};
	if (user.favourites) {
		let ind = user.favourites.findIndex(t => t.id == track.id);
		if (ind !== -1) {
			user.favourites[ind] = newTrack;
			bodyData = { favourites: user.favourites };
		} else {
			bodyData = { favourites: [...user.favourites, newTrack] };
		}
	} else {
		bodyData = { favourites: [newTrack] };
	}
	// console.log(bodyData);
	return fetch(`${API}/user/${user._id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(bodyData)
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const removeFromFavourites = (user, token, id) => {
	user.favourites = user.favourites.filter(track => track.id !== id);
	const bodyData = { favourites: user.favourites };
	
	return fetch(`${API}/user/${user._id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(bodyData)
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};
