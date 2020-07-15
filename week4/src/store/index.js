import Vue from 'vue';
import Vuex from 'vuex';
import { getItem } from '../cookies';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: {
            uuid: getItem('uuid'),
            token: getItem('token'),
        },
        msg: {
            text: '',
            type: false,
        },
        products: [],
        product: {
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
        },
    },
    getters: {
        products: (state) => state.products,
    },
    mutations: {
        SET_MSG(state, { msg, type }) {
            state.msg.text = msg;
            state.msg.type = type;
        },
        CLEAR_MSG(state) {
            state.msg.text = '';
        },
        SET_PRODUCTS(state, data) {
            state.products = [...data];
        },
        ADD_PRODUCTS(state, data) {
            Vue.set(state.products, state.products.length, data);
        },
        EDIT_PRODUCT(state, { id, data }) {
            state.products.forEach((prod, index) => {
                if (prod.id === id) {
                    Vue.set(state.products, index, data);
                }
            });
        },
        DEL_PRODUCT(state, index) {
            state.products.splice(index, 1);
        },
        SET_TEMP_PRODUCT(state, data) {
            state.product = { ...data };
        },
        CLEAR_TEMP_PRODUCT(state) {
            state.product = {
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
            };
        },
    },
    actions: {
        loginMsg({ commit }, { msg, type }) {
            commit('SET_MSG', {
                msg,
                type,
            });
        },
        clearMsg({ commit }) {
            commit('CLEAR_MSG');
        },
        setProducts({ commit }, data) {
            commit('SET_PRODUCTS', data);
        },
        addProducts({ commit }, data) {
            commit('ADD_PRODUCTS', data);
        },
        editProduct({ commit }, { id, data }) {
            commit('EDIT_PRODUCT', {
                id,
                data,
            });
        },
        delProduct({ commit }, index) {
            commit('DEL_PRODUCT', index);
        },
        setTempProduct({ commit }, data) {
            commit('SET_TEMP_PRODUCT', data);
        },
        clearTempProduct({ commit }) {
            commit('CLEAR_TEMP_PRODUCT');
        },
    },
    modules: {},
});
