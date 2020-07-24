import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-dedf7.firebaseio.com/'
});

export default instance;