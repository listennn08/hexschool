import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight, faAngleDoubleDown, faAngleDoubleUp, faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClipboard,
} from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faBars, faAngleDown, faEnvelope, faLock, faEye, faEyeSlash, faPlus,
  faTimes, faCheck, faEdit, faTrashAlt, faShoppingCart, faAngleLeft,
  faAngleRight, faClipboard, faAngleDoubleDown, faAngleDoubleUp, faInfoCircle,
  faInstagram, faFacebook,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
