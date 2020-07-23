import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronRight, faChevronLeft, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookies  from 'vue-cookies'
import BFormInput from 'bootstrap-vue';
import { FormInputPlugin } from 'bootstrap-vue';
//import { virtualList } from 'vue-virtual-scroll-list';
Vue.use(VueCookies)
Vue.use(BFormInput)
Vue.use(FormInputPlugin)
//Vue.use(virtualList)
Vue.$cookies.config('365d') //365d = the cookie expires after 365 days

Vue.config.productionTip = false
library.add(faCog)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faEye)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
