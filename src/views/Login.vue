<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <h1 class="title">Get SWOL</h1>
      <h2 class="subtitle">and log those gains</h2>
      <a class="button is-info is-medium is-outlined" @click.prevent="signIn">
        <span>Sign in</span>
      </a>
    </div>
  </section>
</template>

<script>
import { auth, provider } from '@/firebaseConfig'

export default {
  methods: {
    signIn() {
      auth.signInWithPopup(provider)
        .then(result => {
          this.$store.commit('setCurrentUser', result.user)
          this.$router.push('/dashboard')
        })
        .catch(err => {
          this.$toast.open({
            duration: 5000,
            message: `Oops! ${err}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
