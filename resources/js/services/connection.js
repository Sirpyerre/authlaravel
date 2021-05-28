import axios from 'axios';

const connection = axios.create({
   baseURL: 'http://localhost'
});

export default connection;
