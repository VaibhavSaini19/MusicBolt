import React from "react";
import Navbar from "./Navbar";
import barba from 'barba.js';


const Base = ({
	children
}) => {
	return (
		<div id="base" data-barba="wrapper">
			<Navbar />
			<div className="content" data-barba="container">
				{children}
			</div>
			<footer className="footer bg-light mt-5 pt-3">
				<div className="container py-3">
					<h2 className="font-weight-bold text-center mb-3">Contact Us</h2>
					<div className="row">
						<div className="col-6 justify-content-center align-items-center">
							<form>
								<div className="form-group">
									<label htmlFor="name">Full Name</label>
									<input type="text" className="form-control" id="name" placeholder="Enter name" />
								</div>
								<div className="form-group">
									<label htmlFor="email">Email address</label>
									<input type="email" className="form-control" id="email" placeholder="Enter email" />
									<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
								<div className="form-group">
									<label htmlFor="desc">What would you like to know</label>
									<textarea className="form-control" id="desc" rows="6" placeholder="Describe your query here"></textarea>
								</div>
								<button type="submit" className="btn btn-lg btn-block btn-primary">Submit</button>
							</form>
						</div>
						<div className="col-6 justify-content-center align-items-center">
							<div className="imgContainer">
								<img src="../imgs/contact2.jpg" alt="contact"/>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Base;
