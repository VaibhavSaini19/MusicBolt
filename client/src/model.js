import { action, thunk } from 'easy-peasy';
import { getUser } from './Utils/Common';

export default {
    user: null,
    token: null,
    songs: [],

    // THUNKS
    fetchSongs: thunk(async actions => {
        const res = await fetch('https://localhost:5000/songs/');
        const songs = await res.json();
        actions.setSongs(songs);
    }),

    // ACTIONS
    setUser: action((state, user) => {
        state.user = user;
    }),
    setToken: action((state, token) => {
        state.token = token;
    }),
    setSongs: action((state, songs) => {
        state.songs = songs;
    })
}