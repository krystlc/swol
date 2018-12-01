import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { auth, userCollection } from '@/firebaseConfig'

Vue.use(Vuex)

// TODO: This could be placed somewhere better
const defaultSettings = {
  weight: '',
  sets: 3,
  reps: 10,
  suggestions: false
}

// handle page reload
auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setUserId', user.uid)
    store.dispatch('loadExerciseList')
    userCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUser', doc.data())
    })
  }
})

export const store = new Vuex.Store({
  state: {
    user: {},
    userId: null,
    exerciseList: []
  },
  getters: {
    getUserId: state => {
      return state.userId ? state.userId : null
    },
    getSettings: state => {
      return state.user.settings ? state.user.settings : defaultSettings
    },
    getSessions: state => state.user.sessions,
    getExerciseList: state => state.exerciseList
  },
  actions: {
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
    setUserId(state, id) {
      state.userId = id
    },
    setExerciseList(state, list) {
      state.exerciseList = list
    }
  }
})