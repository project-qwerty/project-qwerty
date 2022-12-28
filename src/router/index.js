import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Practice from '../views/Practice.vue'
import Settings from '../views/Settings.vue'
import SelectCategories from '../views/SelectCategories.vue'
import CustomCategories from '../views/CustomCategories.vue'
import CustomCategory from '../views/CustomCategory.vue'
import About from '../views/About.vue'
import PageNotFound from '../views/PageNotFound.vue'

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
  {
    path: '/custom-categories/:name',
    name: 'custom-category',
    component: CustomCategory,
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
