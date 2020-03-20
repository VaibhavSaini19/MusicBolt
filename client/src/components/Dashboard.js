import React, { Component, useEffect } from "react";
import { useStore, useActions } from 'easy-peasy';
import SongItem from './SongItem'

const Dashboard = () => {
	const songs = useStore(state => state.songs);
	const fetchSongs = useActions(actions => actions.fetchSongs);

	useEffect(() => {
		fetchSongs();
		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<h1 class="mt-4">Dashboard</h1>
			<p class="lead mb-3">Welcome {user.name}</p>
			<a href="/users/logout" class="btn btn-secondary">
				Logout
			</a>
			{songs.map(song => (
				<SongItem song={song} key={song.id} />
			))}
		</div>
	);
}

export default Dashboard;
