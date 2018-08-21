import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
  .then(res => {
    store.commit('setExerciseList', res.data.results)
  })
  .catch(err => {
    alert(`fetching exercise data failed: ${err}`)
  })

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)

    // realtime updates from our posts collection
    fb.sessionCollection.where('uid', '==', store.state.currentUser.uid).limit(5).orderBy('created', 'desc').onSnapshot(querySnapshot => {
      let sessionArray = []
      querySnapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        sessionArray.push(post)
      })
      store.commit('setUserSessions', sessionArray)
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userSessions: null,
    exerciseList: []
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserSessions', null)
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserSessions(state, val) {
      state.userSessions = val
    },
    setExerciseList(state, val) {
      state.exerciseList = val
    }
  }
})