import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueAxios, axios);
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
