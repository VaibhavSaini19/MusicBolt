import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../backend";


const Card = ({ song, setReload = f => f, reload }) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(song.count);

	const cardTitle = song ? song.name : "Title Unavailable";
	const cardDescription = song ? song.description : "Description Unavailable";
	const cardPrice = song ? song.price : "Price Unavailable";

	const getRedirect = redirect => {
		if (redirect) {
			return <Redirect to="/" />;
		}
	};

	return (
		<div className="card border">
			<img src={`${API}/song/photo/${song._id}`} alt="" className="card-img-top"/>
			<div className="card-body">
				{getRedirect(redirect)}
				<h3 className="card-title font-weight-bold">{cardTitle}</h3>
				<p className="lead font-weight-normal text-wrap">{cardDescription}</p>
				<button disabled className="btn btn-danger rounded btn-sm px-4 mr-1" style={{textDecoration: 'line-through'}}>$ {cardPrice*1.5}</button>
				<button className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</button>
				<div className="row mt-1">
					<div className="col-12">asd{}</div>
					<div className="col-12">cvb{}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
