import axios from 'axios';
import store from '../store';

// axios.defaults.baseURL = 'https://course-ec-api.hexschool.io/api/';
const Request = axios.create({
    timeout: 30000,
    baseURL: 'https://course-ec-api.hexschool.io/api/',
});

Request.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${store.state.loginInfo.token}`;
    return request;
});

export function get(url) {
    return Request.get(url);
}
export function post(url, data = {}) {
    return Request.post(url, data);
}
export function patch(url, data = {}) {
    return Request.patch(url, data);
}
export function del(url) {
    return Request.delete(url);
}
