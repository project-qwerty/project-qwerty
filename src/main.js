import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as Sentry from "@sentry/vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGear, faChevronLeft, faEye, faBackspace, faPlay, faHandSparkles, faCircleInfo, faCircleQuestion, faCheck, faRepeat, faFont, faList, faStopwatch, faStar, faBasketShopping, faStethoscope, faCalculator, faFaceGrinWide, faMessage, faClock, faBriefcase, faKeyboard, faPlus, faEllipsisVertical, faTrashCan, faRightFromBracket, faRightToBracket, faX, faICursor, faCircleCheck, faTrophy, faArrowRotateRight, faMinus, faPen, faHouse, faXmark, faCircleXmark, faGift } from '@fortawesome/free-solid-svg-icons';

library.add(faGear, faChevronLeft, faEye, faBackspace, faPlay, faHandSparkles, faCircleInfo, faCircleQuestion, faCheck, faRepeat, faFont, faList, faStopwatch, faStar, faBasketShopping, faStethoscope, faCalculator, faFaceGrinWide, faMessage, faClock, faBriefcase, faKeyboard, faPlus, faEllipsisVertical, faTrashCan, faRightFromBracket, faRightToBracket, faX, faICursor, faCircleCheck, faTrophy, faArrowRotateRight, faMinus, faPen, faHouse, faXmark, faCircleXmark, faGift);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

if (window.location.host === 'projectqwerty.com') {
  Sentry.init({
    Vue,
    dsn: 'https://beaa4ea7e54e4c7a9fc7d944551fd850@o4505056613564416.ingest.sentry.io/4505056616054784',
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ['projectqwerty.com', /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.2,
    beforeSend(event) {
      if (event.request.url) {
        event.request.url = event.request.url.replace(
          /\/custom-categories\/[^/]+/,
          '/custom-categories/******',
        );
      }
      return event;
    },
  });
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
