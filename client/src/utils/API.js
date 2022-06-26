import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser: (username) => {
        return axios.get(`/api/users/${username}`);
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },

    deleteUser: (username) => {
        return axios.delete(`/api/users/${username}`)
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
        return axios.get(`/api/favorites/${username}`)
    },

    addMovieToFavorite: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/favorites/${username}/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToFavorite: (username, ShowId, PosterPath, Title) => {
        return axios.post(`/api/favorites/${username}/shows/${ShowId}${PosterPath}/title/${Title}`)
    },

    removeMovieFromFavorites: (username, MovieId) => {
        return axios.delete(`/api/favorites/${username}/movies/${MovieId}`)
    },

    removeShowFromFavorites: (username, ShowId) => {
        return axios.delete(`/api/favorites/${username}/shows/${ShowId}`)
    },

    getAllWatchList: (username) => {
        return axios.get(`/api/watchlist/${username}`)
    },

    addMovieToWatchList: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/watchlist/${username}/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToWatchList: (username, ShowId, PosterPath, Title) => {
        return axios.post(`/api/watchlist/${username}/shows/${ShowId}${PosterPath}/title/${Title}`)
    },

    removeMovieFromWatchList: (username, MovieId) => {
        return axios.delete(`/api/watchlist/${username}/movies/${MovieId}`)
    },

    removeShowFromWatchList: (username, ShowId) => {
        return axios.delete(`/api/watchlist/${username}/shows/${ShowId}`)
    },

    getAllWatched: (username) => {
        return axios.get(`/api/history/${username}/watched`)
    },

    addMovieToWatched: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/history/${username}/watched/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToWatched: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/history/${username}/watched/shows/${MovieId}${PosterPath}/title/${Title}`)
    },

    removeMovieFromWatched: (username, MovieId) => {
        return axios.delete(`/api/history/${username}/watched/movies/${MovieId}`)
    },

    removeShowFromWatched: (username, MovieId) => {
        return axios.delete(`/api/history/${username}/watched/shows/${MovieId}`)
    },

    getAllEpisodes: (username) => {
        return axios.get(`/api/users/${username}/episodes`)
    },

    addEpisodetoWatched: (username, ShowId, SeasonId, EpisodeId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/shows/${ShowId}/seasons/${SeasonId}/episodes/${EpisodeId}${PosterPath}/title/${Title}`)
    },

    removeEpisodeFromWatched: (username, ShowId, SeasonId, EpisodeId) => {
        return axios.delete(`/api/users/${username}/shows/${ShowId}/seasons/${SeasonId}/episodes/${EpisodeId}`)
    }
};