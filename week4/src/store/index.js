import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        msg: '',
    },
    mutations: {
        setMsg(state, msg) {
            state.msg = msg;
        },
        clearMsg(state) {
            state.msg = '';
        },
    },
    actions: {
        loginMsg({ commit }, msg) {
            commit('setMsg', msg);
        },
        clearMsg({ commit }) {
            commit('clearMsg');
        },
    },
    modules: {},
});
