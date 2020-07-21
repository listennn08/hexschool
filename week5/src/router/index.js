import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/pay-page',
        name: 'pay_page',
        component: () => import('../views/pay_page.vue'),
    },
    {
        path: '/product-list',
        name: 'product_list',
        component: () => import('../views/product_page.vue'),
    },
    {
        path: '/shopcart',
        name: 'shop_cart',
        component: () => import('../views/shop_cart.vue'),
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: 'hexschool/week5/',
    routes,
});

export default router;
