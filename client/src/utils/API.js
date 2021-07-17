import axios from 'axios';

const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    search: (query) => {
        return axios.get(BASEURL + query + APIKEY);
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