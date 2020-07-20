import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: {
            token: '',
        },
        msg: {
            text: '',
            type: false,
        },
        pagination: {},
        category: '',
    },
    getters: {
        msg: (state) => state.msg,
    },
    mutations: {
        SET_MSG(state, { msg, type }) {
            state.msg.text = msg;
            state.msg.type = type;
        },
        CLEAR_MSG(state) {
            state.msg.text = '';
        },
        SET_CATEGORY(state, category) {
            state.category = category;
        },
    },
    actions: {
        setMsg({ commit }, { msg, type }) {
            commit('SET_MSG', {
                msg,
                type,
            });
            setTimeout(() => { commit('CLEAR_MSG'); }, 2000);
        },
        setCategory({ commit }, category) {
            commit('SET_CATEGORY', category);
        },
    },
    modules: {
    },
});
