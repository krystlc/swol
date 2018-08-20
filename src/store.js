import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

axios.get('https://wger.de/api/v2/exercise?language=2&limit=1000&status=2')
  .then(res => {
    store.commit('setExerciseList', res.data.results)
  })
  .catch(err => {
    alert(err)
  })

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data())
    })

    // realtime updates from our posts collection
    fb.sessionCollection.orderBy('created').onSnapshot(querySnapshot => {
      // check if created by currentUser
      let createdByCurrentUser
      if (querySnapshot.docs.length) {
        // createdByCurrentUser = store.state.currentUser.uid == querySnapshot.docChanges().doc.data().userId ? true : false
      }

      // add new posts to hiddenPosts array after initial load
      if (querySnapshot.docChanges().length !== querySnapshot.docs.length
        && querySnapshot.docChanges().type == 'added' && !createdByCurrentUser) {

        let post = querySnapshot.docChanges().doc.data()
        post.id = querySnapshot.docChanges().doc.id

        store.commit('setHiddenPosts', post)
      } else {
        let postsArray = []

        querySnapshot.forEach(doc => {
          let post = doc.data()
          post.id = doc.id
          postsArray.push(post)
        })
        store.commit('setUserSessions', postsArray)
      }
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    hiddenPosts: [],
    userSessions: null,
    exerciseList: []
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setPosts', null)
      commit('setHiddenPosts', null)
      commit('setUserSessions', null)
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    updateProfile({ commit, state }, data) {
      let name = data.name
      let title = data.title

      fb.usersCollection.doc(state.currentUser.uid).update({ name, title }).then(user => {
        // update all posts by user to reflect new name
        fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
          docs.forEach(doc => {
            fb.postsCollection.doc(doc.id).update({
              userName: name
            })
          })
        })
        // update all comments by user to reflect new name
        fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
          docs.forEach(doc => {
            fb.commentsCollection.doc(doc.id).update({
              userName: name
            })
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setUserSessions(state, val) {
      state.userSessions = val
    },
    setExerciseList(state, val) {
      state.exerciseList = val
    },
    setPosts(state, val) {
      if (val) {
        state.posts = val
      } else {
        state.posts = []
      }
    },
    setHiddenPosts(state, val) {
      if (val) {
        // make sure not to add duplicates
        if (!state.hiddenPosts.some(x => x.id === val.id)) {
          state.hiddenPosts.unshift(val)
        }
      } else {
        state.hiddenPosts = []
      }
    }
  }
})