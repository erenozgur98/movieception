import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser: (userId) => {
        return axios.get('/api/user' + userId);
    },

    getAllUsers: () => {
        return axios.get('/api/user');
    },

    deleteUser: (id) => {
        return axios.delete('/api/user' + id)
    },

    signUp: (userInfo) => {
        return axios.post('/api/user/signup', userInfo);
    },

    logIn: (userInfo) => {
        return axios.post('/api/user/login', userInfo);
    },

    logOut: () => {
        return axios.post('/api/user/logout');
    },
}