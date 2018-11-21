<template>
  <button class="button is-primary" @click="newSession">
    <b-icon icon="plus"></b-icon>
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    newSession() {
      this.$store.dispatch('createNewSessionId')
    }
  }
}
</script>
