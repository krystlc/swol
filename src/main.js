import Vue from 'vue'
import App from './App.vue'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import axios from 'axios'

Vue.use(Buefy)
Vue.use(VueFire)

firebase.initializeApp({
  projectId: process.env.VUE_APP_FIREBASE_ID,
  databaseURL: process.env.VUE_APP_FIRESTORE_URL
})

export const db = firebase.firestore()

export const exerciseStore = new Vue({
  data: {
    data: []
  },
  created() {
    axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
      .then(res => {
        this.data = res.data.results
      })
      .catch(err => {
        alert(err)
      })
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
