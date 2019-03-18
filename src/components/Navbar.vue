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
      <div class="level-right" v-if="signedIn">
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
import { mapGetters, mapActions } from 'vuex'
import SettingsForm from '@/components/SettingsForm'

export default {
  components: { SettingsForm },
  data() {
    return {
      isFormActive: false
    }
  },
  computed: {
    ...mapGetters('userData', ['signedIn'])
  },
  methods: {
    ...mapActions(['signOut'])
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
