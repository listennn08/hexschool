import Vue from 'vue';
import * as types from './types';

const mutations = {
    [types.SET_LOGIN_INFO](state, { uuid, token }) {
        state.loginInfo.uuid = uuid;
        state.loginInfo.token = token;
    },
    [types.SET_MSG](state, { msg, type }) {
        state.msg.text = msg;
        state.msg.type = type;
    },
    [types.CLEAR_MSG](state) {
        state.msg.text = '';
    },
    [types.SET_CATEGORY](state, category) {
        state.category = category;
    },
    [types.SET_PRODUCTS](state, data) {
        state.products = [...data];
    },
    [types.SET_PAGINATION](state, data) {
        state.pagination = { ...data };
    },
    [types.TOGGLE_STICKY](state, data) {
        state.sticky = data;
    },
    [types.TOGGLE_LOADING](state) {
        state.loading = !state.loading;
    },
    [types.TOGGLE_PRODUCT_PAGE](state) {
        state.productPage.open = !state.productPage.open;
    },
    [types.SET_TEMP_PRODUCT](state, data) {
        state.tempProduct = { ...data };
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
};

export default mutations;
