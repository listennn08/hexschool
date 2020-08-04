import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
// import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
