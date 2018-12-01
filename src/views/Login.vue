<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <h1 class="title">Get SWOL</h1>
      <h2 class="subtitle">and log those gains</h2>
      <button class="button is-info is-outlined" @click.prevent="signIn">
        <span>Sign in</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted() {
    if(this.getUserId) this.$router.push('/dashboard')
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  methods: {
    ...mapActions(['signIn'])
  }
}
</script>
