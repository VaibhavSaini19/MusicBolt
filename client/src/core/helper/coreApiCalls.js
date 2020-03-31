import React from "react";
import { API } from "../../backend";

export const addToFavourites = (user, token, id, rating) => {
	let bodyData,
		newTrack = { id, rating };
	if (user.favourites) {
		let ind = user.favourites.findIndex(track => track.id == id);
		if (ind !== -1) {
			user.favourites[ind] = newTrack;
			bodyData = { favourites: user.favourites };
		} else {
			bodyData = { favourites: [...user.favourites, { id, rating }] };
		}
	} else bodyData = { favourites: [{ id, rating }] };
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
	// return fetch(`${API}/track/new`, {
	// 	method: "GET",
	// 	headers: {
	// 		Accept: "application/json",
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${token}`
	// 	}
	// })
	// 	.then(data => data.json())
	// 	.catch(err => console.log(err));
};
