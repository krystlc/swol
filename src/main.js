import Vue from 'vue'
import App from '@/App'
import router from '@/router/'
import { store } from '@/store'
const fb = require('@/firebaseConfig')

import Buefy from 'buefy'
import '@/styles/global.scss'

import VueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueMoment)

// handle page reloads
let app
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})