import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Practice from '../views/Practice.vue'
import Settings from '../views/Settings.vue'
import SelectCategories from '../views/SelectCategories.vue'
import CustomCategories from '../views/CustomCategories.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/select-categories',
    name: 'select-categories',
    component: SelectCategories,
  },
  {
    path: '/practice',
    name: 'practice',
    component: Practice,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/custom-categories',
    name: 'custom-categories',
    component: CustomCategories,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
