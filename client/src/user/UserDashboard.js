import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Card from "../core/Card";
import { getNewTracks, getRecommendationTracks, getUserFavourites, getTrackById } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const [tracks, setTracks] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [recommendations, setRecommendations] = useState([]);
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

	const loadUserFavourites = async () => {
		let favList = [];
		let userData = await getUserFavourites(user, token);
		if (userData.favourites) {
			let l = userData.favourites.length;
			userData.favourites.forEach(async (fav, ind) => {
				let data = await getTrackById(token, fav.id);
				favList.push(data);
				if (ind == l-1){
					setFavourites(favList);
				}
			})
		}
	}

	const loadRecommendations = () => {
		getRecommendationTracks(token, user).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setTracks([...recommendations, ...recommendations]);
				console.log("Recommendation Tracks fetched");
			}
		})
	}

	useEffect(() => {
		loadNewTracks();
		loadUserFavourites();
	}, []);

	return (
		<Base>
			<section className="container mt-5" id="songsSection">
				<nav>
					<div className="nav nav-fill nav-lg nav-tabs" id="nav-tab" role="tablist">
						<a className="nav-item nav-link active" id="nav-tracks-tab" data-toggle="tab" href="#nav-tracks" role="tab" aria-controls="nav-tracks" aria-selected="true"><h3>Tracks</h3></a>
						<a className="nav-item nav-link" id="nav-fav-tab" data-toggle="tab" href="#nav-fav" role="tab" aria-controls="nav-fav" aria-selected="false"><h3>Favourites</h3></a>
						<a className="nav-item nav-link" id="nav-rec-tab" data-toggle="tab" href="#nav-rec" role="tab" aria-controls="nav-fav" aria-selected="false"><h3>Recommendations</h3></a>
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
								{/* {console.log(tracks)} */}
								{tracks && tracks.map((track, index) => {
									// console.log(track.name, index);
									if(favourites.findIndex(fav => fav.id == track.id) == -1){
										return (
											<div
												key={index}
												className={`col-lg-4 col-md-6 col-sm-12 element-item track mb-4 ${
													trackTypes[Math.floor(Math.random() * trackTypes.length)]
												}`}
											>
												<Card track={track}/>
											</div>
										);	
									}
								})}
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="nav-fav" role="tabpanel" aria-labelledby="nav-fav-tab">
						<div className="row grid mt-5">
							{favourites && favourites.map((fav, index) => {
								return (
									<div
										key={index}
										className={`col-lg-4 col-md-6 col-sm-12 element-item track mb-4 ${
											trackTypes[Math.floor(Math.random() * trackTypes.length)]
										}`}
									>
										<Card track={fav}/>
									</div>
								);
							})}
						</div>
					</div>
					<div className="tab-pane fade" id="nav-rec" role="tabpanel" aria-labelledby="nav-rec-tab">
						<div className="row grid mt-5">
							<button onClick={loadRecommendations}>Go</button>
						</div>
					</div>
				</div>
			</section>
		</Base>
	);
};

export default UserDashboard;
