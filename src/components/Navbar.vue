<template>
  <nav>
    <div class="container level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <router-link to="/" class="logo" exact><strong>SWOL</strong></router-link>
          </p>
        </div>
      </div>
      <div class="level-right">
        <p class="level-item" v-if="!currentUser">
          <a class="button is-success" @click.prevent="signIn">Sign in</a>
        </p>
        <p class="level-item" v-else>
          <a class="button" @click.prevent="signOut">Logout</a>
        </p>
        <p class="level-item">
          <button class="button is-borderless" @click="isFormActive = true">
            <b-icon icon="settings"></b-icon>
          </button>
        </p>
      <b-modal :active.sync="isFormActive" has-modal-card>
        <settings></settings>
      </b-modal>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import Settings from '@/components/Settings'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: { Settings },
  data() {
    return {
      settings: {},
      isFormActive: false
    }
  },
  created() {
    this.settings = this.userSettings
  },
  computed: {
    ...mapState(['currentUser', 'userSettings'])
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
    }
  }
}
</script>

<style>
nav {
  padding: 1em;
  border-bottom: 1px solid #eee
}
.button.is-borderless {
  border-color: transparent !important;
  padding-right: 0;
}
</style>
