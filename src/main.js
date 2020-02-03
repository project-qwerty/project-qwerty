import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookies  from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('7d') //7d = the cookie expires after 7 days

Vue.config.productionTip = false
library.add(faCog)
library.add(faChevronRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
