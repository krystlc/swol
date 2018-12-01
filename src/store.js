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
    store.commit('setUser', {id: user.uid})
  }
})

// TODO: this could be somewhere nicer
const defaultSettings = {
  weight: '',
  sets: 3,
  reps: 10,
  suggestions: false
}

export const store = new Vuex.Store({
  state: {
    user: null,
    exerciseList: []
  },
  getters: {
    getUserId: state => state.user ? state.user.id : null,
    getSettings: state => state.user ? state.user.settings : defaultSettings,
    getSessions: state => state.user ? state.user.sessions : null,
    getExerciseList: state => state.exerciseList
  },
  actions: {
    signIn({commit}) {
      fb.auth.signInWithPopup(fb.provider)
        .then(res => {
          commit('setUser', {id: res.user.uid})
          router.push('/dashboard')
        })
        .catch(err => {
          alert(`Oops! ${err}`)
        })
    },
    signOut({dispatch}) {
      router.push('/login')
      fb.auth.signOut()
        .then(() => {
          dispatch('clearUser')
        })
        .catch(err => {
          alert(`Oops! ${err}`)
        })
    },
    loadUser({commit}, user) {
      console.log('i guess i will reload the user?')
    },
    loadExerciseList({commit}) {
      axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
        .then(res => {
          commit('setExerciseList', res.data.results)
        })
        .catch(err => {
          alert(`fetching exercise data failed: ${err}`)
        })
    },
    clearUser({commit}) {
      // TODO: should clean sessions and settings too
      commit('setUser', null)
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setExerciseList(state, list) {
      state.exerciseList = list
    }
  }
})