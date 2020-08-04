import axios from 'axios';
import cookies from '../cookies';
import store from '../store';

const Request = axios.create({
  timeout: 30000,
  baseURL: 'https://course-ec-api.hexschool.io/api/',
});

const header = {
  'Content-Type': 'application/json',
};

Request.interceptors.request.use((request) => {
  const req = request;
  req.headers.Authorization = `Bearer ${cookies.getItem('token')}`;
  return req;
});

Request.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const { config } = error;
      if (cookies.getItem('token') && store.state.loginInfo.token) {
        config.headers.Authorization = `Bearer ${cookies.getItem('token')}`;
        return Request.request(config);
      }
    }
    return Promise.reject(error);
  },
);

export function get(url) {
  return Request.get(url);
}
export function post(url, data = {}, headers = header) {
  return Request.post(url, data, { headers });
}
export function patch(url, data = {}) {
  return Request.patch(url, data);
}
export function del(url, data = {}) {
  return Request.delete(url, data);
}
