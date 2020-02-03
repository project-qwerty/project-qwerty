import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Keyboard from '../views/KeyboardPage.vue'
import Settings from '../views/Settings.vue'
import SelectWords from '../views/SelectWords.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/keyboard',
    name: 'keyboard',
    component: Keyboard
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/select_words',
    name: 'select_words',
    component: SelectWords
  },
]

const router = new VueRouter({
  routes
})

export default router
