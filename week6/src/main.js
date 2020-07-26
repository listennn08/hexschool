import Vue from 'vue';

/** Fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import {
  faThumbtack, faClipboardCheck, faInfoCircle, faShoppingCart, faSpinner,
  faExclamationCircle, faAngleDoubleUp, faAngleDoubleDown, faPlus, faTimes,
  faTrashAlt, faEdit, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/** Vue Validatee */
import {
  ValidationObserver, ValidationProvider, extend, configure, localize,
} from 'vee-validate';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
/** vue-loading-overlay */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
/** vue-confirm-dialog */
import VueConfirmDialog from 'vue-confirm-dialog';
import message from './components/MessageModal.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
Vue.component('message', message);
/** 表單驗證 */
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
  },
});
localize('tw', tw);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

library.add(
  faThumbtack, faClipboard, faClipboardCheck, faInfoCircle, faShoppingCart,
  faSpinner, faExclamationCircle, faAngleDoubleUp, faAngleDoubleDown, faPlus,
  faTrashAlt, faTimes, faEdit, faCheck,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Loading, {
  color: '#D3AC2B',
  loader: 'dots',
  width: 64,
  height: 64,
  backgroundColor: '#888888',
  opacity: 0.8,
  zIndex: 9999,
});

Vue.filter('cash', (val) => (val ? `$${val.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')}` : ''));
Vue.filter('hideText', (text) => {
  if (text) {
    return (text.length > 10) ? `${text.substring(0, 9)}...` : text;
  }
  return '';
});
Vue.filter('hideContent', (text) => ((text.length > 25) ? `${text.substring(0, 24)}...` : text));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
