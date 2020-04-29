import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";


const navbar = ({ history }) => {
	return (
		<nav className="navbar shadow navbar-light bg-light sticky-top justify-content-between py-2 topNav">
			<NavLink to="/" className="navbar-brand ml-1 px-4" style={{cursor: 'pointer'}}>
				<div className="row h-100 align-items-center">
					<div className="imgContainer" style={{width: '2rem'}}>
						<img src="../imgs/logo.svg" alt="logo"/>
					</div>
					<span>&emsp;MusicBolt</span>
				</div>
			</NavLink>
			{isAuthenticated() && (
				<div className="">
					Welcome {isAuthenticated().user.name}
				</div>
			)}
			<ul className="nav">
				{isAuthenticated() && isAuthenticated() && (
					<li className="nav-item mx-2">
						<NavLink
							exact
							className="nav-link font-weight-bold"
							to="/"
						>
							Home
						</NavLink>
					</li>
				)}
				{isAuthenticated() && isAuthenticated() && (
					<li className="nav-item mx-2">
						<NavLink
							exact
							className="nav-link font-weight-bold"
							to="/user/dashboard"
						>
							Dashboard
						</NavLink>
					</li>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 1 && (
					<li className="nav-item mx-2">
						<NavLink
							exact
							className="nav-link font-weight-bold"
							to="/admin/dashboard"
						>
							Admin Dashboard
						</NavLink>
					</li>
				)}
				{!isAuthenticated() && (
					<Fragment>
						<li className="nav-item mx-2">
							<NavLink className="nav-link font-weight-bold" to="/signup">
								Sign Up
							</NavLink>
						</li>
						<li className="nav-item mx-2">
							<NavLink className="nav-link font-weight-bold btn btn-primary rounded" to="/signin">
								Sign In
							</NavLink>
						</li>
					</Fragment>
				)}
				{isAuthenticated() && (
					<li className="nav-item mx-2">
						<span
							className="nav-link font-weight-bold btn btn-outline-danger rounded"
							onClick={() => {
								signout(() => {
									history.push("/");
								});
							}}
						>
							Sign Out
						</span>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default withRouter(navbar);
