import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const fb = require('@/firebaseConfig.js')

Vue.use(Vuex)

const userSettings = {
  weight: '',
  sets: 3,
  reps: 10,
  suggestions: false
}

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
    fb.userCollection.doc(store.state.currentUser.uid).get().then(doc =>{
      if (doc.exists) store.commit('setUserSettings', doc.data())
    })
  }
})

export const store = new Vuex.Store({
  state: {
    userSettings,
    exerciseList: [],
    currentUser: null,
    userSessions: null
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserSessions', null)
      commit('setUserSettings', userSettings)
    },
    saveUserSettings({ state }) {
      let userDoc = fb.userCollection.doc(state.currentUser.uid)
      userDoc.get().then(doc => {
        if (doc.exists) {
          userDoc.update(state.userSettings)
        } else {
          userDoc.set(state.userSettings)
        }
      })
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
    },
    setUserSettings(state, val) {
      state.userSettings = val
    }
  }
})