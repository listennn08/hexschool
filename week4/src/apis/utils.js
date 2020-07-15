import store from '../store';
import {
    get, post, patch, del,
} from './axios';

const api = {
    uuid: store.state.loginInfo.uuid,
    login: 'auth/login',
    frontend: {
    },
    backend: {
        createData: '/admin/ec/product',
        getAllData: '/admin/ec/products',
        editData: '/admin/ec/product/', /** update data, delete data */
        file: '/admin/storage',
    },
};

export function Login(data) {
    return post(api.login, data);
}
export function getBackendAllData(p = 1) {
    return get(`${api.uuid}${api.backend.getAllData}?page=${p}`, true);
}
export function getBackendDataDetail(id) {
    return get(`${api.uuid}${api.backend.editData}${id}`, true);
}
export function createData(data) {
    return post(`${api.uuid}${api.backend.createData}`, data);
}
export function updateData(id, data) {
    return patch(`${api.uuid}${api.backend.editData}${id}`, data, true);
}
export function deleteData(id) {
    return del(`${api.uuid}${api.backend.editData}${id}`);
}
