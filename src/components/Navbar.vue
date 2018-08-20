<template>
  <nav class="navbar is-white is-fixed-top">
    <div class="navbar-brand">
      <router-link to="dashboard" class="navbar-item"><strong>SWOL</strong></router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click.prevent="isActive = !isActive">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active': isActive}">
      <div class="navbar-end">
        <span class="navbar-item" v-if="currentUser">
          Hi, {{ firstName }}</span>
        <a class="navbar-item" @click.prevent="signIn" v-if="!currentUser">Sign in</a>
        <a class="navbar-item" @click.prevent="signOut" v-if="currentUser">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapState(['currentUser']),
    firstName() {
      let str = this.currentUser.displayName
      return str.substr(0,str.indexOf(' '))
    }
  },
  methods: {
    signIn() {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.$store.commit('setCurrentUser', result.user)
        })
        .catch(err => {
          this.$toast.open({
            duration: 5000,
            message: `Oops! ${err}`,
            type: 'is-danger'
          })
        })
      this.isActive = false
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('clearData')
        })
        .catch(err => {
          this.$toast.open({
            duration: 5000,
            message: `Oops! ${err.code}. Did you sign in?`,
            type: 'is-danger'
          })
        })
      this.isActive = false
    }
  }
}
</script>
