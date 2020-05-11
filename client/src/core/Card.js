import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { addToFavourites, removeFromFavourites } from "./helper/coreApiCalls";
import { getUserFavourites } from "../user/helper/userApiCalls";

const Card = ({ track }) => {
	const [rating, setRating] = useState(0);
	const [isFav, setIsFav] = useState(false);
	
	const { artist, duration, id, name, image } = track;
	const { user, token } = isAuthenticated();

	const loadTrackRating = () => {
		getUserFavourites(token, user).then(user => {
			if (user.favourites) {
				let track = user.favourites.filter(t => t.id == id);
				if (track.length) {
					setRating(track[0].rating);
					setIsFav(true);
				}
			}
		});
	};

	const showRemoveBtn = () => {
		return (
			isFav && (
				<button onClick={handleRemove} className="btn btn-outline-danger">
					Remove
				</button>
			)
		);
	};
	
	const handleRemove = () => {
		getUserFavourites(token, user).then(user => {
			removeFromFavourites(user, token, track.id).then(user => {
				setRating(0);
				setIsFav(false);
			})
		});
	};

	const handleSubmit = newRating => event => {
		getUserFavourites(token, user).then(user => {
			addToFavourites(user, token, track, newRating).then(user => {
				setRating(newRating);
				setIsFav(true);
			});
		});
	};

	useEffect(() => {
		loadTrackRating();
	}, [rating]);

	return (
		<div className="trackCard">
			<div className="trackCard-img-container">
				<img src={image} alt="track image" className="card-img-top" />
			</div>
			<div className="trackCard-body">
				<div className="trackCard-name">{name}</div>
				<div className="trackCard-artist">{artist}</div>
			</div>
			<div className="trackCard-favourite">
				<div className="removeBtn">{showRemoveBtn()}</div>
				<span className="starRating">
					<input
						id={`${id}rating5`}
						type="radio"
						name={`${id}rating`}
						value="5"
						onChange={handleSubmit("5")}
						checked={rating && rating == "5"}
					/>
					<label htmlFor={`${id}rating5`}>5</label>
					<input
						id={`${id}rating4`}
						type="radio"
						name={`${id}rating`}
						value="4"
						onChange={handleSubmit("4")}
						checked={rating && rating == "4"}
					/>
					<label htmlFor={`${id}rating4`}>4</label>
					<input
						id={`${id}rating3`}
						type="radio"
						name={`${id}rating`}
						value="3"
						onChange={handleSubmit("3")}
						checked={rating && rating == "3"}
					/>
					<label htmlFor={`${id}rating3`}>3</label>
					<input
						id={`${id}rating2`}
						type="radio"
						name={`${id}rating`}
						value="2"
						onChange={handleSubmit("2")}
						checked={rating && rating == "2"}
					/>
					<label htmlFor={`${id}rating2`}>2</label>
					<input
						id={`${id}rating1`}
						type="radio"
						name={`${id}rating`}
						value="1"
						onChange={handleSubmit("1")}
						checked={rating && rating == "1"}
					/>
					<label htmlFor={`${id}rating1`}>1</label>
				</span>
			</div>
		</div>
	);
};

export default Card;
