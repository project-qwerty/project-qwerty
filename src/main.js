import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGear,
  faChevronRight,
  faChevronLeft,
  faEye,
  faBackspace,
  faCloudArrowUp,
  faCloudArrowDown,
  faPlay,
  faHandSparkles,
  faCircleInfo,
  faCircleQuestion,
  faHandPointer,
  faCheck,
  faRepeat,
  faFont,
  faList,
  faStopwatch,
  faStar,
  faPerson,
  faBasketShopping,
  faStethoscope,
  faCalculator,
  faFaceGrinWide,
  faMessage,
  faClock,
  faBriefcase,
  faKeyboard,
  faPlus,
  faEllipsisVertical,
  faTrashCan,
  faRightFromBracket,
  faRightToBracket,
  faX,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BFormInput from 'bootstrap-vue'
import { FormInputPlugin } from 'bootstrap-vue'

Vue.use(BFormInput)
Vue.use(FormInputPlugin)
Vue.config.productionTip = false

// TODO: there has to be a better way than this
library.add(faGear)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faEye)
library.add(faBackspace)
library.add(faCloudArrowUp)
library.add(faCloudArrowDown)
library.add(faPlay)
library.add(faHandSparkles)
library.add(faCircleInfo)
library.add(faCircleQuestion)
library.add(faHandPointer)
library.add(faCheck)
library.add(faRepeat)
library.add(faFont)
library.add(faList)
library.add(faStopwatch)
library.add(faStar)
library.add(faPerson)
library.add(faBasketShopping)
library.add(faStethoscope)
library.add(faCalculator)
library.add(faFaceGrinWide)
library.add(faMessage)
library.add(faClock)
library.add(faBriefcase)
library.add(faKeyboard)
library.add(faPlus)
library.add(faEllipsisVertical)
library.add(faTrashCan)
library.add(faRightFromBracket)
library.add(faRightToBracket)
library.add(faX)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
