import React from "react";


const Card = ({ track }) => {
	const {artist, duration, id, name, image} = track;

	return (
		<div className="trackCard">
			<div className="trackCard-img-container">
				<img src={image} alt="track image" className="card-img-top"/>
			</div>
			<div className="trackCard-body">
				<div className="trackCard-name">{name}</div>
				<div className="trackCard-artist">{artist}</div>
			</div>
		</div>
	);
};

export default Card;
