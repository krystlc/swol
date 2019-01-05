import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import * as fb from '@/firebaseConfig'

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setUser', user.uid)
    store.dispatch('loadExerciseList')
    fb.userCollection.doc(user.uid).onSnapshot(doc => {
      if (doc.exists) {
        const sessions = doc.data().sessions
        const settings = doc.data().settings
        const maxWeight = doc.data().maxWeight
        if (sessions) store.commit('setSessions', sessions)
        if (settings) store.commit('setSettings', settings)
        if (maxWeight) store.commit('setMaxWeight', maxWeight)
      } else {
        fb.userCollection.doc(user.uid).set({
          settings: null,
          sessions: null
        })
      }
    })
  }
})

const defaultSettings = {
  weight: 0,
  sets: 3,
  reps: 10,
  suggestions: false
}

export const store = new Vuex.Store({
  state: {
    user: null,
    sessions: [],
    maxWeight: [],
    settings: defaultSettings,
    exerciseList: []
  },
  getters: {
    getUserId: state => state.user,
    getSettings: state => state.settings,
    getSessions: state => state.sessions,
    getMaxWeight: state => state.maxWeight,
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
    setMaxWeight(state, maxWeight) {
      state.maxWeight = maxWeight
    },
    setExerciseList(state, list) {
      state.exerciseList = list
    }
  }
})