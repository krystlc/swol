<template>
  <nav class="navbar is-white is-fixed-top">
    <div class="navbar-brand">
      <a href="#" class="navbar-item"><strong>SWOL</strong></a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click.prevent="isActive = !isActive">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active': isActive}">
      <div class="navbar-end">
        <span class="navbar-item" v-if="user">Hi, {{ user.displayName }}</span>
        <a href="#" class="navbar-item" @click.prevent="signIn" v-if="!user">Sign in</a>
        <a href="#" class="navbar-item" @click.prevent="signOut" v-if="user">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      user: null,
      isActive: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(result => {
      this.user = result
    })
  },
  methods: {
    signIn() {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          this.user = result.user
        })
        .catch(err => {
          console.error(err.message)
        })
      this.isActive = false
    },
    signOut() {
      firebase.auth().signOut()
      this.isActive = false
    }
  }
}
</script>
