import React from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const Landing = () => {
	return (
		<Base>
			<section className="" style={{ background: "#FFFFFF" }}>
				<div class="svgs">
					<img src="./imgs/static_bg.svg" alt=""/>
				</div>
				<div className="page" id="part1">
					<div className="imgContainer">
						<img src="./imgs/main_bg_trans.png" alt="asd" />
					</div>
					<div className="info">
						<div className="title text-primary">Music Recommender System</div>
						<div className="title-support">using Collaborative Filtering &amp; Spotify API</div>
						<div className="dev">
							<div className="text-primary">
								<i className="far fa-file-code"></i>&nbsp;
								Developed by
							</div>
							<ul className="ml-5">
								<li>Vaibhav Saini</li>
								<li>Sachin Sahil</li>
							</ul>
						</div>
						<div className="btn-grp">
							<a href="/user/dashboard" className="try">
								Try now
							</a>
							<a href="#part2" className="more">
								How it works?
							</a>
						</div>
					</div>
					<div className="scrollIndicator"></div>
				</div>
				<div className="page" id="part2">
					<div className="card myCard">
						<div className="myCard-img">
							<img src="./imgs/track.svg" alt=""/> 
						</div>
						<div className="myCard-title text-blue">Latest tracks</div>
						<div className="myCard-body ">Get a list of latest tracks released in the market, fetched thorugh the Spotify API</div>
					</div>
					<div className="card myCard">
						<div className="myCard-img">
							<img src="./imgs/rating.svg" alt=""/>
						</div>
						<div className="myCard-title text-green">Add to Favourites</div>
						<div className="myCard-body ">Seamlessly add/remove songs to your Favourite tracks by giving them ratings</div>
					</div>
					<div className="card myCard">
						<div className="myCard-img">
							<img src="./imgs/model.svg" alt=""/>
						</div>
						<div className="myCard-title text-orange">Recommendation</div>
						<div className="myCard-body ">Get a bunch of Songs recommended to you by our recommender engine based on collaborative filtering</div>
					</div>
					<div className="scrollIndicator"></div>
				</div>
			</section>
		</Base>
	);
};

export default Landing;
