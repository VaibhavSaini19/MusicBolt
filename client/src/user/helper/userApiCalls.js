import React from "react";
import { API } from "../../backend";

export const getUserFavourites = (token, user) => {
	return fetch(`${API}/track/favourites/${user._id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const getNewTracks = token => {
	return fetch(`${API}/track/new`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const getFeaturedTracks = token => {
	return fetch(`${API}/track/featured`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const getTrackById = (token, id) => {
	return fetch(`${API}/track/${id}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const getRecommendationTracks = (token, user) => {
	return fetch(`${API}/user/${user._id}/recommendations`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const getAllUsersFavs = (token, user) => {
	return fetch(`${API}/user/${user._id}/all`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};

export const getSearchQueryResults = (token, user, searchQuery) => {
	let url = new URL(`${API}/track/${user._id}/search`)
	let params = {q: searchQuery}
	url.search = new URLSearchParams(params).toString();

	return fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(data => data.json())
		.catch(err => console.log(err));
};
