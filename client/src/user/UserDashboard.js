import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import "../styles.css";
import Card from "../core/Card";
import { getNewReleasesTracks } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const [tracks, setTracks] = useState([]);
	const [error, setError] = useState(false);
	const trackTypes = ["popular", "latest", "upcoming", "onsale"];
	const { user, token } = isAuthenticated();

	const loadNewReleasesTracks = () => {
		getNewReleasesTracks(token).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				// console.log(data);
				setTracks(data);
				console.log("Tracks list fetched");
			}
		});
	};

	useEffect(() => {
		loadNewReleasesTracks();
	}, []);

	return (
		<Base>
			<section className="container mt-5" id="songsSection">
				<h1 className="font-weight-bold">Tracks</h1>
				<div className="tracks-area">
					<div className="button-group">
						<button type="button" data-filter="*" className="active" id="btn1">
							All
						</button>
						<button type="button" data-filter=".popular">
							Popular
						</button>
						<button type="button" data-filter=".latest">
							Latest
						</button>
						<button type="button" data-filter=".upcoming">
							Upcoming
						</button>
					</div>
					<div className="row grid mt-5">
						{tracks && tracks.map((track, index) => {
							return (
								<div
									key={index}
									className={`col-lg-4 col-md-6 col-sm-12 element-item track mb-4 ${
										trackTypes[Math.floor(Math.random() * trackTypes.length)]
									}`}
								>
									<Card track={track} />
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</Base>
	);
};

export default UserDashboard;
