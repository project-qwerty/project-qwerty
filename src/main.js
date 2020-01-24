import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = false
library.add(faCog)
library.add(faChevronRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
