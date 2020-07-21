import * as types from './types';

const mutations = {
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
};

export default mutations;
