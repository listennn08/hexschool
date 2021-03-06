import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: {
            uuid: null,
            token: null,
        },
        msg: {
            text: '',
            type: false,
        },
        products: [],
        tempProduct: {
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
        productPage: {
            open: false,
        },
        loading: false,
    },
    getters: {
        pid: (state) => state.tempProduct.id,
        product: (state) => state.tempProduct,
        products: (state) => state.products,
        productPage: (state) => state.productPage,
        loading: (state) => state.loading,
        msg: (state) => state.msg,
    },
    mutations: {
        SET_USER_INFO(state, { uuid, token }) {
            state.loginInfo.uuid = uuid;
            state.loginInfo.token = token;
        },
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
            state.products.unshift(data);
            Vue.set(state, 'products', state.products);
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
            state.tempProduct = { ...data };
        },
        CLEAR_TEMP_PRODUCT(state) {
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
        TOGGLE_PAGE(state) {
            Vue.set(state.productPage, 'open', !state.productPage.open);
        },
        IS_LOADING(state, is) {
            state.loading = is;
        },
    },
    actions: {
        setUserInfo({ commit }, { uuid, token }) {
            commit('SET_USER_INFO', {
                uuid,
                token,
            });
        },
        setMsg({ commit }, { msg, type }) {
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
        togglePage({ commit }) {
            commit('TOGGLE_PAGE');
        },
        isLoading({ commit }, is) {
            commit('IS_LOADING', is);
        },
    },
    modules: {},
});
