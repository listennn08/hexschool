import { post } from '@/apis/axios';
import cookies from '@/cookies';

const api = {
  uuid: process.env.VUE_APP_API_UUID,
  auth: {
    base: 'auth',
    login: '/login',
    logout: '/logout',
    check: '/check',
  },
};

export function Login(data) {
  return post(`${api.auth.base}${api.auth.login}`, data);
}
export function Logout() {
  return post(`${api.auth.base}${api.auth.logout}`, {
    api_token: cookies.getItem('token'),
  });
}
export function checkToken() {
  return post(`${api.auth.base}${api.auth.check}`, {
    api_token: cookies.getItem('token'),
  });
}
