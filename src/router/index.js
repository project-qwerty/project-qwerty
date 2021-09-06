import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Keyboard from '../views/KeyboardPage.vue'
import Settings from '../views/Settings.vue'
import SelectWords from '../views/SelectWords.vue'
import General from '../views/settings/General.vue'
import Display from '../views/settings/Display.vue'
import CustomLists from '../views/settings/CustomLists.vue'
import About from '../views/settings/About.vue'

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
    component: Settings,
    children: [
      {
        path: '',
        component: General
      },
      {
        path: 'display',
        component: Display
      },
      {
        path: 'custom-lists',
        component: CustomLists
      },
      {
        path: 'about',
        component: About
      },
    ]
  },
  {
    path: '/select_words',
    name: 'select_words',
    component: SelectWords
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
