import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faHouse, faXmark, faGear, faChevronLeft, faEye, faBackspace, faPlay, faHandSparkles, faCircleInfo, faCircleQuestion, faCheck, faRepeat, faFont, faList, faStopwatch, faStar, faBasketShopping, faStethoscope, faCalculator, faFaceGrinWide, faMessage, faClock, faBriefcase, faKeyboard, faPlus, faEllipsisVertical, faTrashCan, faRightFromBracket, faRightToBracket, faX, faICursor, faCircleCheck, faTrophy, faArrowRotateRight, faMinus, faPen } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faHouse, faXmark, faGear, faChevronLeft, faEye, faBackspace, faPlay, faHandSparkles, faCircleInfo, faCircleQuestion, faCheck, faRepeat, faFont, faList, faStopwatch, faStar, faBasketShopping, faStethoscope, faCalculator, faFaceGrinWide, faMessage, faClock, faBriefcase, faKeyboard, faPlus, faEllipsisVertical, faTrashCan, faRightFromBracket, faRightToBracket, faX, faICursor, faCircleCheck, faTrophy, faArrowRotateRight, faMinus, faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
