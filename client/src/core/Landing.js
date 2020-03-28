import React from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Landing = () => {
	return (
		<Base>
			<section className="" style={{ background: "#FFDBF5" }}>
				<div className="row">
					<div className="col-6 text-center">
						<div className="imgContainer" style={{ width: "40em" }}>
							<img src="./imgs/store.jpg" alt="store vector" />
						</div>
					</div>
					<div className="col-5">
						<div className="row h-100 align-items-center">
							<div className="row mx-0">
								<div className="display-4 font-weight-bold mb-5">
									Music, that matches your <span className="text-primary">GROOVE</span>
								</div>
								<h3 className="text-muted">Favourite Artists. Hottest Tracks</h3>
							</div>
							<div className="row mx-0">
								<a href="#howItWorksSection" className="btn btn-lg btn-outline-primary mr-5 btn-pill">
									How it works? <i className="fas fa-caret-down"></i>
								</a>
								{!isAuthenticated() && (
									<Link to="/signup" className="btn btn-lg btn-primary btn-pill">
										Get Started
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Base>
	);
};

export default Landing;
