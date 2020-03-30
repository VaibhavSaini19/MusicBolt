import React from "react";
import Navbar from "./Navbar";
import barba from 'barba.js';
import { Footer } from "./Footer";


const Base = ({
	children
}) => {
	return (
		<div id="base" data-barba="wrapper">
			<Navbar />
			<div className="content" data-barba="container">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default Base;
