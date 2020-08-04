export default {
  namespace: true,
  state: () => ({

  }),
  getters: {

  },
  actions: {
    doLogin(payload) {
      const { email, password } = payload;
      if (!email) {
        return;
      }
    },
    setLoginInfo({ commit }, { uuid, token }) {
      commit(types.SET_LOGIN_INFO, {
        uuid,
        token,
      });
    },
    clearLoginInfo({ commit }) {
      commit(types.CLEAR_LOGIN_INFO);
    },
  },
  mutations: {

  }

}