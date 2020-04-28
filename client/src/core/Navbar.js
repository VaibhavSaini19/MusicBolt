import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";


const navbar = ({ history }) => {
	return (
		<nav className="navbar shadow navbar-light bg-light sticky-top justify-content-between py-2">
			<NavLink to="/" className="navbar-brand ml-1 px-4" style={{cursor: 'pointer'}}>
				<div className="row h-100 align-items-center">
					<div className="imgContainer" style={{width: '2rem'}}>
						<img src="../imgs/logo.png" alt="logo"/>
					</div>
					<span>&nbsp;MusicBolt</span>
				</div>
			</NavLink>
			<form className="form-inline">
				<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
				<button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Go</button>
			</form>
			<ul className="nav">
				{isAuthenticated() && isAuthenticated().user.role === 0 && (
					<li className="nav-item mx-2">
						<NavLink
							activeClass="activeNavLink" exact
							className="nav-link font-weight-bold"
							to="/"
						>
							Home
						</NavLink>
					</li>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 0 && (
					<li className="nav-item mx-2">
						<NavLink
							activeClass="activeNavLink" exact
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
							activeClass="activeNavLink" exact
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
							<NavLink activeClass="activeNavLink" exact className="nav-link font-weight-bold" to="/signup">
								Sign Up
							</NavLink>
						</li>
						<li className="nav-item mx-2">
							<NavLink activeClass="activeNavLink" exact className="nav-link font-weight-bold btn btn-primary rounded" to="/signin">
								Sign In
							</NavLink>
						</li>
					</Fragment>
				)}
				{isAuthenticated() && (
					<li className="nav-item mx-2">
						<span
							className="nav-link font-weight-bold btn btn-danger rounded"
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
