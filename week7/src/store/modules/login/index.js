import { Login } from '@/api/utils';
export default {
  namespace: true,
  state: () => ({
    token: null,
    isLogin: false,
  }),
  getters: {

  },
  actions: {
    doLogin(payload) {
      const { email, password } = payload;
      if (!email) {
        return;
      }
      if(!password) {
        return;
      }
      Login({
        email,
        password,
      })
        .then((resp) => {

        })
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
