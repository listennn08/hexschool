import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/About.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: 'logout',
        component: () => import('../views/Logout.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../components/Coupons.vue'),
      },
      {
        path: 'shopcart',
        component: () => import('../views/Shopcart.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/Checkout.vue'),
      },
      {
        path: 'payment/:id',
        component: () => import('../views/Payment.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Backend/Home.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('../views/Backend/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'products',
        component: () => import('../views/Backend/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'coupons',
        component: () => import('../views/Backend/Coupons.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'orders',
        component: () => import('../views/Backend/Orders.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'files',
        component: () => import('../views/Backend/FileStorages.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const { token } = store.state.loginInfo;
    if (token) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
export default router;
