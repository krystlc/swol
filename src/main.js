import Vue from 'vue'
import App from '@/App'
import router from '@/router/'
import { store } from '@/store'
const fb = require('@/firebaseConfig')

import Chart from 'vue2-frappe'
import Buefy from 'buefy'
import '@/styles/global.scss'

Vue.config.productionTip = false

Vue.use(Chart)
Vue.use(Buefy)

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