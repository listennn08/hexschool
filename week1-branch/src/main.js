import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faInstagram, faFacebookF  } from '@fortawesome/free-brands-svg-icons';
import { fas, faShoppingCart, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { far, faThumbsUp  } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// dom.watch();
library.add(fab, fas, far, faThumbsUp, faInstagram, faFacebookF, faShoppingCart, faThumbtack);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
