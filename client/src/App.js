import React from "react";
import "./App.css";

function App() {
	return (
		<div className="hero-gradient">
			<nav class="navbar navbar-expand-lg px-5">
				<a class="navbar-brand text-white" href="#">
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
							<a class="nav-link text-white" href="#">
								Home
							</a>
						</li>
						<li class="nav-item mr-5">
							<a class="nav-link text-white" href="#">
								About
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-white" href="#">
								Log In
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<section className="container">
				<div className="row py-5">
					<div className="col-lg-6 col-md-12 text-white">
						<div className="row tagline">Music, that touches your soul</div>
						<div className="row tagline-helper my-5">Anywhere. Everywhere</div>
						<div className="row cta-grp">
							<div className="col cta">Get Started</div>
							<div className="col cta">Learn more</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12 py-5">
						{/* <img src="./img/music-bg-1.jpg" className="img-fluid"></img> */}
						{/* <img src="./img/music-person-1.jpg" className="img-fluid"></img> */}
						<img src="./img/music-person-1-nobg.png" className="img-fluid"></img>
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;
