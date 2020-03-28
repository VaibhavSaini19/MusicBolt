import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import "../styles.css";
import Card from "../core/Card";
import { getAllSongs } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const [songs, setSongs] = useState([]);
	const [error, setError] = useState(false);
	const songTypes = ["popular", "latest", "upcoming", "onsale"];

	// const loadAllSongs = () => {
	// 	getAllSongs().then(data => {
	// 		if (data.error) {
	// 			setError(data.error);
	// 		} else {
	// 			setSongs(data);
	// 			console.log("Songs list fetched");
	// 		}
	// 	});
	// };

	// useEffect(() => {
	// 	loadAllSongs();
	// }, []);

	return (
		<Base>
			<section className="container mt-5" id="songsSection">
				<h1 className="font-weight-bold">Songs</h1>
				<div className="songs-area">
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
						{songs.map((song, index) => {
							return (
								<div
									key={index}
									className={`col-lg-4 col-md-6 col-sm-12 element-item song mb-4 ${
										songTypes[Math.floor(Math.random() * songTypes.length)]
									}`}
								>
									<Card song={song} />
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
