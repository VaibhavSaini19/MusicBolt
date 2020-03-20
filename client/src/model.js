import { action, thunk } from 'easy-peasy';

export default {
    songs: [],

    // THUNKS
    fetchSongs: thunk(async actions =>{
        const res = await fetch('https://localhost:5000/songs/');
        const songs = await res.json();
        actions.setSongs(songs);
    }),

    // ACTIONS
    setSongs: action((state, songs) => {
        state.songs = songs;
    })
}