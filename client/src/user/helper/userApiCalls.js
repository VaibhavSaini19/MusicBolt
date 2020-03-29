import React from "react";
import { API } from "../../backend";

export const getNewReleasesTracks = token => {
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
