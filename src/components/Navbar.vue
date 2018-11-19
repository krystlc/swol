<template>
  <nav>
    <div class="container level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <router-link to="/" class="logo" exact>
              <img src="../assets/logo.svg" alt="SWOL" width="80">
            </router-link>
          </p>
        </div>
      </div>
      <div class="level-right" v-if="currentUser">
        <p class="level-item">
          Hi, {{ currentUser.displayName }}
        </p>
        <p class="level-item">
          <button class="button is-text">
            <b-icon icon="plus"></b-icon>
          </button>
        </p>
        <p class="level-item">
          <button class="button is-text" @click="isFormActive = true">
            <b-icon icon="settings"></b-icon>
          </button>
        </p>
        <p class="level-item">
          <button class="button is-light" @click.prevent="signOut">
            Logout
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
import { auth } from '@/firebaseConfig'

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
    signOut() {
      auth.signOut()
        .then(() => {
          this.$store.dispatch('clearData')
          this.$router.push('/login')
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
