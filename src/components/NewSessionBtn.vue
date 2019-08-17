<template>
  <div class="fab">
    <b-tooltip
      label="Start a new session!"
      position="is-left"
      animated
    >
      <router-link class="button is-primary" to="/s/new" tag="button">
        <b-icon icon="plus" size="is-medium"></b-icon>
      </router-link>
    </b-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  .button {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
}
</style>