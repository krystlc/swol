import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { auth, userCollection, sessionCollection } from '@/firebaseConfig'

Vue.use(Vuex)

// TODO: This could be inside the `setUserSettings` mutation logic instead
const defaultSettings = {
  weight: '',
  sets: 3,
  reps: 10,
  suggestions: false
}

// TODO: This could be an action function
axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
  .then(res => {
    store.commit('setExerciseList', res.data.results)
  })
  .catch(err => {
    alert(`fetching exercise data failed: ${err}`)
  })

// handle page reload
auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    userCollection.doc(user.uid).onSnapshot(doc => {
      if (doc.exists) {
        if (doc.data().settings) store.commit('setUserSettings', doc.data().settings)
        if (doc.data().sessions) store.commit('setUserSessions', doc.data().sessions)
      }
    })
  }
})

export const store = new Vuex.Store({
  state: {
    exerciseList: [],
    currentUser: null,
    currentSession: [],
    userSessions: [],
    userSettings: defaultSettings
  },
  getters: {
    getExerciseList: state => state.exerciseList,
    getUserSettings: state => state.userSettings,
    getUserSessions: state => state.userSessions,
    getCurrentSession: state => state.currentSession,
    getUserId: state => state.currentUser.uid
  },
  actions: {
    clearData({commit}) {
      commit('setCurrentUser', null)
      commit('setCurrentSession', [])
      commit('setUserSessions', [])
      commit('setUserSettings', defaultSettings)
    },
    saveUserSettings({state}) {
      const user = userCollection.doc(state.currentUser.uid)
      const settings = {settings: state.userSettings}
      user.get().then(doc => doc.exists ? user.update(settings) : user.set(settings))
    },
    loadSession({commit}, id) {
      sessionCollection.doc(id).get().then(session => {
        if (session.exists) {
          commit('setCurrentSession', session.data())
        } else {
          alert('This session does not exist')
          router.push('/dashboard')
        }
      }).catch(err => {
        alert('There was an error', err)
        router.push('/dashboard')
      })
    },
    addSessionWorkout({commit}, workout) {
      commit('setSessionWorkout', workout)
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setCurrentSession(state, val) {
      state.currentSession = val
    },
    setUserSessions(state, val) {
      state.userSessions = val
    },
    setExerciseList(state, val) {
      state.exerciseList = val
    },
    setUserSettings(state, val) {
      state.userSettings = val
    },
    setSessionWorkout(state, val) {
      state.currentSession.push(val)
    }
  }
})