<template>
  <section class="hero is-black is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Get SWOL</h1>
        <h2 class="subtitle">and log those gains</h2>
        <button class="button is-primary is-outlined is-large" @click.prevent="signIn">
          <span>Sign in</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    if (this.getUserId) this.$router.push("/dashboard");
  },
  computed: {
    ...mapGetters(["getUserId"])
  },
  methods: {
    ...mapActions(["signIn"])
  }
};
</script>
