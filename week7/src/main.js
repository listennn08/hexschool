import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.sass';
import './plugins/Loading';
import './plugins/confirm';
import './plugins/fontawesome';
import './plugins/vee-validate';
import './filters';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
