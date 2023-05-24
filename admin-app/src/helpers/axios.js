import axios from 'axios';
import { api } from '../store/urlConfig';

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': ''
    }
}); 

export default axiosIntance;