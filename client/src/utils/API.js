import axios from 'axios';

// this is the one I'll use
const BASEURL = "https://www.omdbapi.com/?";
const APIKEY = `apikey=trilogy&s=`;

const BASEURL1 = "https://www.omdbapi.com/?t=";
const APIKEY1 = `&apikey=trilogy`;

const BASEURL_ID = "https://www.omdbapi.com/?i="

const MOVIE = "&type=movie";
const SHOW = "&type=series";

const PAGE = "&page=1"

// const YEAR = "&y2021"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // this is the one I'll use
    search: (query) => {
        return axios.get(`${BASEURL}${APIKEY}${query}${PAGE}`);
    },

    searchOne: (query) => {
        return axios.get(`${BASEURL1}${query}${APIKEY1}`);
    },
    
    searchMovie: (query) => {
        return axios.get(`${BASEURL}${APIKEY}${query}${MOVIE}${PAGE}`);
    },

    searchMovieId: (query) => {
        return axios.get(`${BASEURL_ID}${query}${APIKEY1}${MOVIE}`);
    },
    
    searchShow: (query) => {
        return axios.get(`${BASEURL}${APIKEY}${query}${SHOW}${PAGE}`);
    },

    searchShowId: (query) => {
        return axios.get(`${BASEURL_ID}${query}${APIKEY1}${SHOW}`);
    },

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
};


// let baseUrl = 'https://api.themoviedb.org/3/';
//         let apiKey = 'af737f76cdba5b7435e17cc94568c07d';
//         let IMGurl = 'https://image.tmdb.org/t/p/w300';