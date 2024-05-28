import axios from 'axios';
import qs from 'qs';

export const baseURL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

export const api = axios.create({
    baseURL: baseURL,
    paramsSerializer: {
        serialize: (params) => {
            return qs.stringify(params, { arrayFormat: 'brackets' });
        },
    },
});


if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const parsedToken = JSON.parse(token);
            if (parsedToken) {
                config.headers.Authorization = parsedToken;
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
}
