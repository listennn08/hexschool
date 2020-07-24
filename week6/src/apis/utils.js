import {
    get, post, patch, del,
} from './axios';

const api = {
    uuid: process.env.VUE_APP_API_UUID,
    login: 'auth/login',
    backend: '/admin',
    shopcart: {
        base: '/ec/shopping',
        deleteAll: '/all/product',
    },
    product: {
        base: '/ec/product',
        allBase: '/ec/products',
        file: '/admin/storage',
    },
    order: {
        base: '/ec/orders',
    },
};
/** Front-End Product API */
export function getAllProducts(p = 1) {
    return get(`${api.uuid}${api.product.allBase}?page=${p}`);
}
export function getDataDetail(id) {
    return get(`${api.uuid}${api.product.base}/${id}`);
}
/** Front-End Shopcart API */
export function getCart() {
    return get(`${api.uuid}${api.shopcart.base}`);
}
export function addCart(product, quantity) {
    return post(`${api.uuid}${api.shopcart.base}`, {
        product,
        quantity,
    });
}
export function updateCart(product, quantity) {
    return patch(`${api.uuid}${api.shopcart.base}`, {
        product,
        quantity,
    });
}
export function deleteCart(product) {
    return product
        ? del(`${api.uuid}${api.shopcart.base}/${product}`)
        : del(`${api.uuid}${api.shopcart.base}${api.shopcart.deleteAll}`);
}

export function getCartQuantity() {
    return get(`${api.uuid}${api.shopcart.base}`);
}
/** Front-End Order API */
export function createOrder(data) {
    return post(`${api.uuid}${api.order.base}`, {
        ...data,
    });
}

/** Login API */
export function Login(data) {
    return post(api.login, data);
}
/** Back-End ProductApi */
export function getBackendAllData(p = 1) {
    return get(`${api.uuid}${api.backend}${api.product.getAllBAse}?page=${p}`, true);
}
export function getBackendDataDetail(id) {
    return get(`${api.uuid}${api.backend}${api.product.base}${id}`, true);
}
export function createData(data) {
    return post(`${api.uuid}${api.backend}${api.product.base}`, data);
}
export function updateData(id, data) {
    return patch(`${api.uuid}${api.backend}${api.product.base}${id}`, data, true);
}
export function deleteData(id) {
    return del(`${api.uuid}${api.backend}${api.product.base}${id}`);
}
