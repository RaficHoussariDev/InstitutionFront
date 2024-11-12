import axios from "axios";
import {getToken} from "./tokenService";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if(token && !config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => Promise.reject(error)
);

export default api;