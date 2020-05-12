import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Card from "../core/Card";
import { getNewTracks, getRecommendationTracks, getSearchQueryResults, getUserFavourites, getTrackById } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const [tracks, setTracks] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [recommendations, setRecommendations] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const trackTypes = ["popular", "latest", "upcoming", "onsale"];
	const { user, token } = isAuthenticated();

	var delayTimer;

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
		let userData = await getUserFavourites(token, user);
		if (userData.favourites) {
			let l = userData.favourites.length;
			userData.favourites.forEach(async (fav, ind) => {
				let data = await getTrackById(token, fav.id);
				if (data)
					favList.push(data);
				if (ind == l - 1) {
					// console.log(favList);
					setFavourites(favList);
				}
			});
		}
	};

	const loadRecommendations = () => {
		getRecommendationTracks(token, user).then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				console.log(data);
				let recs = [];
				let len = data.length;
				data.forEach((trackId, ind) => {
					getTrackById(token, trackId)
						.then(track => {
							if(track)
								recs.push(track);
							if (ind == len - 1) {
								setRecommendations([...recommendations, ...recs]);
								console.log("Recommendation Tracks fetched");
							}
						})
						.catch(err => console.log(err));
				});
			}
		});
	};

	const execSearchQuery = (txt) => {
		if (txt){
			clearTimeout(delayTimer);
			delayTimer = setTimeout(function() {
				console.log("SEACRHING: ", txt);
				setLoading(true);
				getSearchQueryResults(token, user, txt)
					.then(data => {
						if(data && data.error){
							setError(data.error)
						}else if(data.length){
							console.log("Data: ", data);
							let res = [];
							let l = data.length;
							data.forEach((id, ind) => {
								getTrackById(token, id)
									.then(track => {
										res.push(track);
										if (ind == l - 1) {
											setSearchResults(res);
											console.log("Search Query Results fetched");
										}
									})
									.catch(err => console.log(err));
							});
						}
						setLoading(false);
					})
					.catch(err => console.log(err));
			}, 1000);
		}else{
			clearTimeout(delayTimer);
			setSearchResults([]);
		}
	};

	const loadingMsg = () => {
		return (
			<img className="col-1" src="../imgs/loading.gif" style={{ display: loading ? "block" : "none" }}/>
		);
	};

	useEffect(() => {
		loadNewTracks();
		loadUserFavourites();
		loadRecommendations();
	}, []);


	return (
		<Base>
			<section className="container mt-5" id="songsSection">
				<div className="form-group">
					<label htmlFor="seach"><h4><i className="fas fa-search text-muted">&nbsp;</i>Search something</h4></label>
					<input
						type="text"
						onChange={e => execSearchQuery(e.target.value)}
						className="form-control"
						id="searchQuery"
						placeholder="Song / artist / album"
					/>
				</div>
				{loadingMsg()}
				<div className="row grid mb-3">
					{searchResults && 
						searchResults.map((track, index) => {
						// console.log(track.name, index);
						return (
							<div
								key={index}
								className={`col-lg-3 col-md-6 col-sm-12 element-item track mb-4 ${
									trackTypes[Math.floor(Math.random() * trackTypes.length)]
								}`}
							>
								<Card track={track} />
							</div>
						);
					})}
				</div>
				<nav className="mt-5">
					<div className="nav nav-fill nav-lg nav-tabs" id="nav-tab" role="tablist">
						<a
							className="nav-item nav-link active"
							id="nav-tracks-tab"
							data-toggle="tab"
							href="#nav-tracks"
							role="tab"
							aria-controls="nav-tracks"
							aria-selected="true"
						>
							<h3>Tracks</h3>
						</a>
						<a
							className="nav-item nav-link"
							id="nav-fav-tab"
							data-toggle="tab"
							href="#nav-fav"
							role="tab"
							aria-controls="nav-fav"
							aria-selected="false"
						>
							<h3>Favourites</h3>
						</a>
						<a
							className="nav-item nav-link"
							id="nav-rec-tab"
							data-toggle="tab"
							href="#nav-rec"
							role="tab"
							aria-controls="nav-fav"
							aria-selected="false"
						>
							<h3>Recommendations</h3>
						</a>
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-tracks"
						role="tabpanel"
						aria-labelledby="nav-home-tab"
					>
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
								{tracks &&
									tracks.map((track, index) => {
										// console.log(track.name, index);
										if (favourites.findIndex(fav => fav.id == track.id) == -1) {
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
										}
									})}
							</div>
						</div>
					</div>
					<div className="tab-pane fade" id="nav-fav" role="tabpanel" aria-labelledby="nav-fav-tab">
						<div className="row grid mt-5">
							{favourites &&
								favourites.map((fav, index) => {
									return (
										<div
											key={index}
											className={`col-lg-4 col-md-6 col-sm-12 element-item track mb-4`}
										>
											<Card track={fav} />
										</div>
									);
								})}
						</div>
					</div>
					<div className="tab-pane fade" id="nav-rec" role="tabpanel" aria-labelledby="nav-rec-tab">
						<div className="row grid mt-5">
							{recommendations &&
								recommendations.map((rec, index) => {
									return (
										<div
											key={index}
											className={`col-lg-4 col-md-6 col-sm-12 element-item track mb-4`}
										>
											<Card track={rec} />
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</section>
		</Base>
	);
};

export default UserDashboard;
