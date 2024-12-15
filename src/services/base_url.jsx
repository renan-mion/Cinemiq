import axios from 'axios';

const base_url = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default base_url;

