import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // getUser: (userId) => {
    //     return axios.get('/api/users' + userId);
    // },

    getAllUsers: () => {
        return axios.get('/api/users');
    },

    // deleteUser: (id) => {
    //     return axios.delete('/api/users' + id)
    // },

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
}