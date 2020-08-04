import {
  get, post, patch, del,
} from './axios';
import cookies from '../cookies';

const api = {
  uuid: process.env.VUE_APP_API_UUID,
  auth: {
    base: 'auth',
    login: '/login',
    logout: '/logout',
    check: '/check',
  },
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
  coupon: {
    allBase: '/ec/coupons',
    base: '/ec/coupon',
  },
  file: '/storage',
};
/** Front-End Product api */
export function getAllProducts(p = 1) {
  return get(`${api.uuid}${api.product.allBase}?page=${p}`);
}
export function getDataDetail(id) {
  return get(`${api.uuid}${api.product.base}/${id}`);
}
/** Back-End Product api */
export function getBackendAllData(p = 1) {
  return get(`${api.uuid}${api.backend}${api.product.allBase}?page=${p}`, true);
}
export function getBackendDataDetail(id) {
  return get(`${api.uuid}${api.backend}${api.product.base}/${id}`, true);
}
export function createData(data) {
  return post(`${api.uuid}${api.backend}${api.product.base}`, data);
}
export function updateData(id, data) {
  return patch(`${api.uuid}${api.backend}${api.product.base}/${id}`, data, true);
}
export function deleteData(id) {
  return del(`${api.uuid}${api.backend}${api.product.base}/${id}`);
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
export function getOrder(id) {
  return get(`${api.uuid}${api.order.base}/${id}`);
}

export function payOrder(id) {
  return post(`${api.uuid}${api.order.base}/${id}/paying`);
}
/** Back-End Order api */
export function getBackendOrders() {
  return get(`${api.uuid}${api.backend}${api.order.base}`);
}
export function changeOrderPayment(id, action) {
  const pay = action ? 'paid' : 'unpaid';
  return patch(`${api.uuid}${api.backend}${api.order.base}/${id}/${pay}`);
}

/** auth API */
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

/** Front-End coupon  api */
export function searchCupons(data) {
  return post(`${api.uuid}${api.coupon.base}/search`, data);
}
/** Back-End coupon  api */
export function getBackendAllCupons() {
  return get(`${api.uuid}${api.backend}${api.coupon.allBase}`);
}
export function getBackendCuponDetail(id) {
  return get(`${api.uuid}${api.backend}${api.coupon.base}/${id}`);
}
export function createCupon(data) {
  return post(`${api.uuid}${api.backend}${api.coupon.base}`, data);
}
export function updateCupon(id, data) {
  return patch(`${api.uuid}${api.backend}${api.coupon.base}/${id}`, data);
}
export function deleteCupon(id) {
  return del(`${api.uuid}${api.backend}${api.coupon.base}/${id}`);
}

/** Back-End file api */
export function getFile() {
  return get(`${api.uuid}${api.backend}${api.file}`);
}
export function uploadFile(data) {
  return post(`${api.uuid}${api.backend}${api.file}`, data);
}
export function deleteFile(id) {
  return del(`${api.uuid}${api.backend}${api.file}/${id}`);
}
