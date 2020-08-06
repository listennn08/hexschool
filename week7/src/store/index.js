import Vue from 'vue';
import Vuex from 'vuex';
import state from './states';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import loginModule from './loginModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    login: loginModule,
  },

});

export default store;
