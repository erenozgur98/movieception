import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser: (userId) => {
        return axios.get('/api/user' + userId);
    },

    getAllUsers: () => {
        return axios.get('/api/users');
    },

    deleteUser: (id) => {
        return axios.delete('/api/user' + id)
    },

    signUp: (userInfo) => {
        return axios.post('/api/signup', userInfo);
    },

    logIn: (userInfo) => {
        return axios.post('/api/login', userInfo);
    },

    logOut: () => {
        return axios.post('/api/logout');
    },

    loggedIn: () => {
        return axios.get('/api/user');
    },
}