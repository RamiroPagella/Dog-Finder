import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: token
  }
})

export default Axios;