import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import * as fb from '@/firebaseConfig'

Vue.use(Vuex)

// handle page reload
/*
fb.auth.onAuthStateChanged(user => {
  if (user) {
    fb.userCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUser', doc.data())
    })
    store.dispatch('loadUser')
    store.dispatch('loadExerciseList')
  } else {
    console.log('no user')
  }
})
*/
fb.auth.onAuthStateChanged(user => {
  if(user) {
    store.commit('setUser', user.uid)
    fb.userCollection.doc(user.uid).onSnapshot(doc => {
      if(doc.exists) {
        const sessions = doc.data().sessions
        const settings = doc.data().settings
        if(sessions) store.commit('setSessions', sessions)
        if(settings) store.commit('setSettings', settings)
      }
    })
  }
})

const defaultSettings = {
  weight: '',
  sets: 3,
  reps: 10,
  suggestions: false
}

export const store = new Vuex.Store({
  state: {
    user: null,
    sessions: [],
    settings: defaultSettings,
    exerciseList: []
  },
  getters: {
    getUserId: state => state.user,
    getSettings: state => state.settings,
    getSessions: state => state.sessions,
    getExerciseList: state => state.exerciseList
  },
  actions: {
    signIn({commit}) {
      fb.auth.signInWithPopup(fb.provider)
        .then(res => {
          commit('setUser', res.user.uid)
          router.push('/dashboard')
        })
        .catch(err => {
          alert(`Oops! ${err}`)
        })
    },
    signOut({commit}) {
      fb.auth.signOut()
        .then(() => {
          commit('setUser', null)
          commit('setSessions', [])
          commit('setSettings', defaultSettings)
          router.push('/login')
        })
        .catch(err => {
          alert(`Oops! ${err}`)
        })
    },
    loadExerciseList({commit}) {
      axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
        .then(res => {
          commit('setExerciseList', res.data.results)
        })
        .catch(err => {
          alert(`fetching exercise data failed: ${err}`)
        })
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSessions(state, sessions) {
      state.sessions = sessions
    },
    setSettings(state, settings) {
      state.settings = settings
    },
    setExerciseList(state, list) {
      state.exerciseList = list
    }
  }
})