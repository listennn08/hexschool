import {
    get, post, patch, del,
} from './http.js';

const api = {
    uuid: 'dd62b88f-6f23-42a4-8551-b1cb4552bb3e',
    login: 'auth/login',
    frontend: {

    },
    backend: {
        getAllData: '/admin/ec/products',
        editData: '/admin/ec/product/', /** update data, delete data */
        file: '/admin/storage',
    },
};

export const Login = (data) => post(api.login, data);

export const getBackendAllData = () => get(`${api.uuid}${api.backend.getAllData}`);
export const createData = (data) => post(`${api.uuid}${api.backend.getAllData}`, data);
export const updateData = (id, data) => post(`${api.uuid}${api.backend.editData}${id}`, data);
export const deleteData = (id) => del(`${api.uuid}${api.backend.editData}${id}`);
