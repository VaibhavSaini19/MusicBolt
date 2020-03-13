import React from "react";
import "./App.css";

function App() {
	return (
		<div className="">
			<nav class="navbar navbar-expand-lg navbar-light bg-light px-5">
				<a class="navbar-brand" href="#">
					Navbar
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse " id="navbarNav">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item mr-5">
							<a class="nav-link" href="#">
								Home
							</a>
						</li>
						<li class="nav-item mr-5">
							<a class="nav-link" href="#">
								About
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Log In
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<section className="container">
				<div className="row">
					<div className="col-lg-6 col-md-12">asd</div>
					<div className="col-lg-6 col-md-12">asd</div>
				</div>
			</section>
		</div>
	);
}

export default App;
