import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/allItem',
    name: 'allItem',
    component: () => import('../views/product_list.vue')
  },
  {
    path: '/discount',
    name: 'discount',
    component: () => import('../components/discount_panel.vue')
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('../views/shop_cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
