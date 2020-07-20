import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/product-manage',
        name: 'product-manage',
        component: () => import('../views/product-manage.vue'),
    },
    {
        path: '/',
        redirect: '/Login',
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: 'hexschool/week4',
    routes,
});

export default router;
