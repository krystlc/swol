import Vue from 'vue'
import App from './App.vue'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import axios from 'axios'

import VueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueFire)
Vue.use(VueMoment)

const config = {
  apiKey: 'AIzaSyDt7dZt1do0RiHVXQm55JaYXs734RbWd5g',
  authDomain: 'swol-42b55.firebaseapp.com',
  databaseURL: 'https://swol-42b55.firebaseio.com',
  projectId: 'swol-42b55',
  storageBucket: 'swol-42b55.appspot.com',
  messagingSenderId: '134839827188'
}
firebase.initializeApp(config)

export const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

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

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
