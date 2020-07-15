import Vue from 'vue';

import VueConfirmDialog from 'vue-confirm-dialog';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, faTimes, faCheck, faTrashAlt, faExclamationCircle, faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(faPlus, faTimes, faCheck, faTrashAlt, faExclamationCircle, faEdit);

Vue.use(VueConfirmDialog);
Vue.use(Loading, {
    color: 'blue',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.8,
    zIndex: 999,
    isFullPage: true,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
