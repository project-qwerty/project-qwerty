import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Keyboard from '../views/Keyboard.vue'
import Settings from '../views/Settings.vue'
import SelectLists from '../views/SelectLists.vue'
import CustomLists from '../views/CustomLists.vue'
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
    path: '/select-lists',
    name: 'select-lists',
    component: SelectLists,
  },
  {
    path: '/keyboard',
    name: 'keyboard',
    component: Keyboard,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/custom-lists',
    name: 'custom-lists',
    component: CustomLists,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
