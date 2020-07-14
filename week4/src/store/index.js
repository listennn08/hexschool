import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        msg: {
            text: '',
            type: false,
        },
    },
    mutations: {
        setMsg(state, { msg, type }) {
            state.msg.text = msg;
            state.msg.type = type;
        },
        clearMsg(state) {
            state.msg.text = '';
        },
    },
    actions: {
        loginMsg({ commit }, { msg, type }) {
            commit('setMsg', {
                msg,
                type,
            });
        },
        clearMsg({ commit }) {
            commit('clearMsg');
        },
    },
    modules: {},
});
