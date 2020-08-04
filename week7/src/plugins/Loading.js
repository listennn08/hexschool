import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading, {
  color: '#D3AC2B',
  loader: 'dots',
  width: 64,
  height: 64,
  backgroundColor: '#888888',
  opacity: 0.8,
  zIndex: 9999,
});
