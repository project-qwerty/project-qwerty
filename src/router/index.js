import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OP from '../views/OpeningPage.vue'
import Keyboard from '../views/KeyboardPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/testing',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/op',
    name: 'op',
    component: OP
  },
  {
    path: '/keyboard',
    name: 'keyboard',
    component: Keyboard
  },
]

const router = new VueRouter({
  routes
})

export default router
