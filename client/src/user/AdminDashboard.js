import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import Card from "../core/Card";
import { getAllUsersFavs } from "./helper/userApiCalls";
import { isAuthenticated } from "../auth/helper";

const AdminDashboard = () => {
	const [usersFavs, setUsersFavs] = useState([]);
	const { user, token } = isAuthenticated();

	const loadAllUsersFavs = () => {
		getAllUsersFavs(token, user)
			.then(data => {
				setUsersFavs(data);
				console.log("All Users Favs fetched")
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		loadAllUsersFavs();
	}, []);

	return (
		<Base>
			<section className="container border rounded mt-5" id="">
				<nav id="navbar-user-data" className="navbar navbar-light bg-light my-2 shadow-sm rounded">
					<ul className="nav nav-pills">
						{usersFavs && usersFavs.map((userData, ind) => {
							return (
							<li className="nav-item">
								<a key={ind} className="nav-link" href={`#${userData._id}`}>
									{userData.name}
								</a>
							</li>
							)
						})}
					</ul>
				</nav>
				<table class="table table-bordered">
					<thead>
						<tr className="table-success">
							<th scope="col-3"><h4>Username</h4></th>
							<th scope="col-3"><h4>Song</h4></th>
							<th scope="col-3"><h4>Artist</h4></th>
							<th scope="col"><h4>Rating</h4></th>
						</tr>
					</thead>
					<tbody>
					{usersFavs && usersFavs.map((userData, ind) => {
						return (
							<tr>
								<td id={userData._id}>
									<h4>{userData.name}</h4>
								</td>
								<td>
									{userData.favourites.map((fav, ind) => {
										return (
											<div className="alert p-2 alert-primary">
												<b>{fav.name}</b>
											</div>
										)
									})}
								</td>
								<td>
									{userData.favourites.map((fav, ind) => {
										return (
											<div className="alert p-2 alert-info">
												{fav.artist}
											</div>
										)
									})}
								</td>
								<td>
									{userData.favourites.map((fav, ind) => {
										return (
											<div className="alert p-2 alert-warning">
												<b>{fav.rating}</b> stars
											</div>
										)
									})}
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</section>
		</Base>
	);
};

export default AdminDashboard;
