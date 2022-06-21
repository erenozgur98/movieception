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

    addMovieToFavorite: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/favorite/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToFavorite: (username, ShowId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/favorite/shows/${ShowId}${PosterPath}/title/${Title}`)
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

    addMovieToWatchList: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/watchlist/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToWatchList: (username, ShowId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/watchlist/shows/${ShowId}${PosterPath}/title/${Title}`)
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

    addMovieToWatched: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/watched/movies/${MovieId}${PosterPath}/title/${Title}`)
    },

    addShowToWatched: (username, MovieId, PosterPath, Title) => {
        return axios.post(`/api/users/${username}/watched/shows/${MovieId}${PosterPath}/title/${Title}`)
    },

    removeMovieFromWatched: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/watched/movies/${MovieId}`)
    },

    removeShowFromWatched: (username, MovieId) => {
        return axios.delete(`/api/users/${username}/watched/shows/${MovieId}`)
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