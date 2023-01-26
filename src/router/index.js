import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PracticePage from '../views/PracticePage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import SelectCategoriesPage from '../views/SelectCategoriesPage.vue'
import CustomCategoriesPage from '../views/CustomCategoriesPage.vue'
import CustomCategoryPage from '../views/CustomCategoryPage.vue'
import AboutPage from '../views/AboutPage.vue'
import PageNotFoundPage from '../views/PageNotFoundPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/select-categories',
    name: 'select-categories',
    component: SelectCategoriesPage,
  },
  {
    path: '/practice',
    name: 'practice',
    component: PracticePage,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
  },
  {
    path: '/custom-categories',
    name: 'custom-categories',
    component: CustomCategoriesPage,
  },
  {
    path: '/custom-categories/:name',
    name: 'custom-category',
    component: CustomCategoryPage,
  },
  {
    path: '*',
    name: '404',
    component: PageNotFoundPage,
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
