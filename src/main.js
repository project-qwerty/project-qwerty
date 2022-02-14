import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronRight, faChevronLeft, faEye, faBackspace, faCloudUploadAlt, faCloudDownloadAlt, faPlay, faHandSparkles, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BFormInput from 'bootstrap-vue'
import { FormInputPlugin } from 'bootstrap-vue'

Vue.use(BFormInput)
Vue.use(FormInputPlugin)
Vue.config.productionTip = false

// TODO: there has to be a better way than this
library.add(faCog)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faEye)
library.add(faBackspace)
library.add(faCloudUploadAlt)
library.add(faCloudDownloadAlt)
library.add(faPlay)
library.add(faHandSparkles)
library.add(faInfoCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
