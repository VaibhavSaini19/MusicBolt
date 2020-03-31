import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import "../styles.css";
import Card from "../core/Card";
import { getNewTracks, getFeaturedTracks } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const [tracks, setTracks] = useState([]);
	const [error, setError] = useState(false);
	const trackTypes = ["popular", "latest", "upcoming", "onsale"];
	const { user, token } = isAuthenticated();

	const loadNewTracks = () => {
		getNewTracks(token).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setTracks([...tracks, ...data]);
				console.log("New Tracks fetched");
			}
		});
	};

	const loadFeaturedTracks = () => {
		getFeaturedTracks(token).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				// console.log(data);
				setTracks([...tracks, ...data]);
				console.log("Featured Tracks fetched");
			}
		});
	};

	useEffect(() => {
		loadNewTracks();
	}, []);

	return (
		<Base>
			<section className="container mt-5" id="songsSection">
				<nav>
					<div className="nav nav-fill nav-lg nav-tabs" id="nav-tab" role="tablist">
						<a className="nav-item nav-link active" id="nav-tracks-tab" data-toggle="tab" href="#nav-tracks" role="tab" aria-controls="nav-tracks" aria-selected="true"><h3>Tracks</h3></a>
						<a className="nav-item nav-link" id="nav-fav-tab" data-toggle="tab" href="#nav-fav" role="tab" aria-controls="nav-fav" aria-selected="false"><h3>Favourites</h3></a>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div className="tab-pane fade show active" id="nav-tracks" role="tabpanel" aria-labelledby="nav-home-tab">
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
					</div>
					<div className="tab-pane fade" id="nav-fav" role="tabpanel" aria-labelledby="nav-fav-tab">
						
					</div>
				</div>
			</section>
		</Base>
	);
};

export default UserDashboard;
