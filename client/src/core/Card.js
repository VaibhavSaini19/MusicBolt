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
			<div className="trackCard-rating">
				<span className="starRating">
					<input id={`${id}rating5`} type="radio" name={`${id}rating`} value="5" />
					<label htmlFor={`${id}rating5`}>5</label>
					<input id={`${id}rating4`} type="radio" name={`${id}rating`} value="4" />
					<label htmlFor={`${id}rating4`}>4</label>
					<input id={`${id}rating3`} type="radio" name={`${id}rating`} value="3" />
					<label htmlFor={`${id}rating3`}>3</label>
					<input id={`${id}rating2`} type="radio" name={`${id}rating`} value="2" />
					<label htmlFor={`${id}rating2`}>2</label>
					<input id={`${id}rating1`} type="radio" name={`${id}rating`} value="1" />
					<label htmlFor={`${id}rating1`}>1</label>
				</span>
			</div>
		</div>
	);
};

export default Card;
