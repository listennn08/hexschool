import * as types from './types';

const actions = {
  setLoginInfo({ commit }, { uuid, token }) {
    commit(types.SET_LOGIN_INFO, {
      uuid,
      token,
    });
  },
  clearLoginInfo({ commit }) {
    commit(types.CLEAR_LOGIN_INFO);
  },
  setMsg({ commit }, { msg, type }) {
    commit(types.SET_MSG, {
      msg,
      type,
    });
    setTimeout(() => commit(types.CLEAR_MSG), 2000);
  },
  setCategory({ commit }, category) {
    commit(types.SET_CATEGORY, category);
  },
  setProducts({ commit }, data) {
    commit(types.SET_PRODUCTS, data);
  },
  addProducts({ commit }, data) {
    commit(types.ADD_PRODUCTS, data);
  },
  editProduct({ commit }, { id, data }) {
    commit(types.EDIT_PRODUCT, {
      id,
      data,
    });
  },
  delProduct({ commit }, index) {
    commit(types.DEL_PRODUCT, index);
  },
  setPagination({ commit }, data) {
    commit(types.SET_PAGINATION, data);
  },
  setTempProduct({ commit }, data) {
    commit(types.SET_TEMP_PRODUCT, data);
  },
  clearTempProduct({ commit }) {
    commit(types.CLEAR_TEMP_PRODUCT);
  },
  toggleProductPage({ commit }) {
    commit(types.TOGGLE_PRODUCT_PAGE);
  },
  toggleLoading({ commit }) {
    commit(types.TOGGLE_LOADING);
  },
  toggleSticky({ commit }, data) {
    commit(types.TOGGLE_STICKY, data);
  },
  setFiles({ commit }, data) {
    commit(types.SET_FILES, data);
  },
  setOrders({ commit }, data) {
    commit(types.SET_ORDERS, data);
  },
  setCoupons({ commit }, data) {
    commit(types.SET_COUPONS, data);
  },
};

export default actions;
