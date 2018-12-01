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
      <div class="level-right" v-if="getUserId">
        <p class="level-item">
          <button class="button is-primary" @click="create">
            <b-icon icon="plus"></b-icon>
            <slot></slot>
          </button>
        </p>
        <p class="level-item">
          <button class="button is-text" @click="isFormActive = true">
            <b-icon icon="settings"></b-icon>
          </button>
        </p>
        <p class="level-item">
          <button class="button" @click.prevent="signOut">
            Logout
          </button>
        </p>
      <b-modal :active.sync="isFormActive" has-modal-card>
        <settings-form></settings-form>
      </b-modal>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from '@/firebaseConfig'
import SettingsForm from '@/components/SettingsForm'
import CreateSession from '@/mixins/CreateSessionMixin'

export default {
  mixins: [CreateSession],
  components: { SettingsForm },
  data() {
    return {
      isFormActive: false
    }
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  methods: {
    signOut() {
      auth.signOut()
        .then(() => {
          // TODO: Probably should scrub user data after signing out
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
