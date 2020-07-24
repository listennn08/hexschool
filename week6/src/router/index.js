import Vue from 'vue';
import VueRouter from 'vue-router';
import { getItem } from '../cookies';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/product-list',
        name: 'product_list',
        component: () => import('../views/Products.vue'),
    },
    {
        path: '/discount',
        name: 'discount',
        component: () => import('../components/DiscountPanel.vue'),
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () => import('../views/Shopcart.vue'),
    },
    {
        path: '/payment',
        name: 'payment',
        component: () => import('../views/Payment.vue'),
    },
    {
        path: '/admin',
        component: () => import('../views/Backend/Home.vue'),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/product-manage',
                name: 'product_manage',
                component: () => import('../views/Backend/ProductManage.vue'),
            },
        ],
    },
    {
        path: '/*',
        
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = getItem('token');
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
