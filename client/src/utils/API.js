import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser: (userId) => {
        return axios.get('/api/users' + userId);
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },

    deleteUser: (id) => {
        return axios.delete('/api/users' + id)
    },

    signUp: (userInfo) => {
        return axios.post('/api/users/signup', userInfo);
    },

    logIn: (userInfo) => {
        return axios.post('/api/users/login', userInfo);
    },

    logOut: () => {
        return axios.post('/api/users/logout');
    },

    loggedIn: () => {
        return axios.get('/api/users/user');
    },

    getAllFavorites: (username) => {
        return axios.get(`/api/users/${username}/favorites`)
    },

    addMovieToFavorite: (username, MovieId) => {
        return axios.post(`/api/users/${username}/favorite/movies/${MovieId}`)
    },

    addShowToFavorite: (username, ShowId) => {
        return axios.post(`/api/users/${username}/favorite/shows/${ShowId}`)
    },

    removeMovieFromFavorites: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/favorite/movies/${MovieId}`)
    },

    removeShowFromFavorites: (username, ShowId) => {
        return axios.delete(`/api/users/${username}/favorite/shows/${ShowId}`)
    },

    getAllWatchList: (username) => {
        return axios.get(`/api/users/${username}/watchlist`)
    },

    addMovieToWatchList: (username, MovieId) => {
        return axios.post(`/api/users/${username}/watchlist/movies/${MovieId}`)
    },

    addShowToWatchList: (username, ShowId) => {
        return axios.post(`/api/users/${username}/watchlist/shows/${ShowId}`)
    },

    removeMovieFromWatchList: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/watchlist/movies/${MovieId}`)
    },

    removeShowFromWatchList: (username, ShowId) => {
        return axios.delete(`/api/users/${username}/watchlist/shows/${ShowId}`)
    },

    getAllWatched: (username) => {
        return axios.get(`/api/users/${username}/watched`)
    },

    addMovieToWatched: (username, MovieId) => {
        return axios.post(`/api/users/${username}/watched/movies/${MovieId}`)
    },

    addShowToWatched: (username, MovieId) => {
        return axios.post(`/api/users/${username}/watched/shows/${MovieId}`)
    },

    removeMovieFromWatched: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/watched/movies/${MovieId}`)
    },

    removeShowFromWatched: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/watched/shows/${MovieId}`)
    },
};