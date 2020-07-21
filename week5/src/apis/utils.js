import {
    get, post, patch, del,
} from './axios';

const api = {
    uuid: 'dd62b88f-6f23-42a4-8551-b1cb4552bb3e',
    login: 'auth/login',
    shopcart: {
        base: '/ec/shopping',
        deleteAll: '/all/product',
    },
    product: {
        backend: '/admin',
        base: '/ec/product',
        allBase: '/ec/products',
        file: '/admin/storage',
    },
    order: {
        backend: '/admin',
        base: '/ec/orders',
    },
};

export function getAllProducts(p = 1) {
    return get(`${api.uuid}${api.product.allBase}?page=${p}`);
}
export function getDataDetail(id) {
    return get(`${api.uuid}${api.product.base}/${id}`);
}
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
    console.log(product);
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

export function createOrder(data) {
    return post(`${api.uuid}${api.order.base}`, {
        ...data,
    });
}
