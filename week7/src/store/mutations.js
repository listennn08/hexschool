import Vue from 'vue';
import * as types from './types';

const mutations = {
  [types.SET_LOGIN_INFO](state, { uuid, token }) {
    Vue.set(state, 'loginInfo', {
      uuid,
      token,
      isLogin: Boolean(token),
    });
  },
  [types.CLEAR_LOGIN_INFO](state) {
    Vue.set(state, 'loginInfo', {
      uuid: '',
      token: '',
      isLogin: false,
    });
  },
  [types.SET_MSG](state, { msg, type }) {
    Vue.set(state, 'msg', {
      text: msg,
      type,
    });
  },
  [types.CLEAR_MSG](state) {
    Vue.set(state, 'msg', { text: '' });
  },
  [types.SET_CATEGORY](state, category) {
    Vue.set(state, 'category', category);
  },
  [types.SET_PRODUCTS](state, data) {
    Vue.set(state, 'products', [...data]);
  },
  [types.ADD_PRODUCTS](state, data) {
    state.products.unshift(data);
    Vue.set(state, 'products', state.products);
  },
  [types.EDIT_PRODUCT](state, { id, data }) {
    state.products.forEach((prod, index) => {
      if (prod.id === id) {
        Vue.set(state.products, index, data);
      }
    });
  },
  [types.DEL_PRODUCT](state, index) {
    state.products.splice(index, 1);
    Vue.set(state, 'products', state.products);
  },
  [types.SET_PAGINATION](state, data) {
    Vue.set(state, 'pagination', { ...data });
  },
  [types.TOGGLE_STICKY](state, data) {
    Vue.set(state, 'sticky', data);
  },
  [types.TOGGLE_LOADING](state) {
    Vue.set(state, 'loading', !state.loading);
  },
  [types.TOGGLE_PAGE](state) {
    Vue.set(state.page, 'open', !state.page.open);
  },
  [types.SET_TEMP_PRODUCT](state, data) {
    Vue.set(state, 'tempProduct', { ...data });
  },
  [types.CLEAR_TEMP_PRODUCT](state) {
    Vue.set(state, 'tempProduct', {
      id: null,
      title: null,
      category: null,
      content: null,
      imageUrl: [],
      enabled: null,
      origin_price: null,
      price: null,
      unit: null,
      options: {
        store: null,
      },
    });
  },
  [types.SET_FILES](state, data) {
    Vue.set(state, 'files', data);
  },
  [types.DEL_FILES](state, index) {
    state.files.splice(index, 1);
    Vue.set(state, 'files', state.files);
  },
  [types.SET_ORDERS](state, data) {
    Vue.set(state, 'orders', data);
  },
  [types.SET_ORDER](state, data) {
    Vue.set(state, 'order', { ...data });
  },
  [types.SET_COUPONS](state, data) {
    Vue.set(state, 'coupons', data);
  },
  [types.SET_COUPON](state, data) {
    Vue.set(state, 'coupon', { ...data });
  },
  [types.CLEAR_TEMP_COUPON](state) {
    Vue.set(state, 'coupon', {
      id: null,
      title: null,
      percent: null,
      enabled: null,
      deadline: {
        datetime: null,
        diff: null,
      },
    });
  },
};

export default mutations;
