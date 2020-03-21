import React, { useEffect } from "react";
import { useStore, useActions } from 'easy-peasy';
import SongItem from './SongItem'
import { getUser, removeUserSession } from '../Utils/Common';
 
function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/users/login');
  }
 
  return (
    <div>
      Welcome {user.name}!<br /><br />
      <button type="button" className="btn btn-danger" onClick={handleLogout} value="Logout">Logout</button>
    </div>
  );
}
 
export default Dashboard;

// const Dashboard = () => {
// 	const songs = useStore(state => state.songs);
// 	const fetchSongs = useActions(actions => actions.fetchSongs);

// 	useEffect(() => {
// 		fetchSongs();
// 		//eslint-disable-next-line
// 	}, []);

// 	return (
// 		<div>
// 			<h1 class="mt-4">Dashboard</h1>
// 			<p class="lead mb-3">Welcome {user.name}</p>
// 			<a href="/users/logout" class="btn btn-secondary">
// 				Logout
// 			</a>
// 			{songs.map(song => (
// 				<SongItem song={song} key={song.id} />
// 			))}
// 		</div>
// 	);
// }

// export default Dashboard;




// https://www.cluemediator.com/implement-login-authentication-in-react-app-using-node-js