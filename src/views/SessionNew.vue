<template>
  <section class="section">
    <div class="container">
      <!-- i think this will be the session card -->
      <article class="session">
        <header>
          <h2 class="subtitle">
            New session
          </h2>
        </header>
        <div class="content">
          <workout-sets 
            :payload="session" 
            :edit="true"
            v-on:remove="removeWorkout"
          >
            <template>
              <p>Click the <b-icon icon="plus" size="is-small"></b-icon> icon below</p>
            </template>
          </workout-sets>
        </div>
      </article>
    </div>
    <footer class="controls has-background-white">
      <nav class="columns is-mobile is-gapless">
        <div class="column">
          <button :class="controlButton" @click="saveSession" :disabled="session.length === 0">
            <b-icon icon="check" size="is-medium"></b-icon>
          </button>
        </div>
        <div class="column">
          <button :class="controlButton" @click="isFormActive = true">
            <b-icon icon="plus" size="is-medium"></b-icon>
          </button>
        </div>
        <div class="column">
          <router-link :class="controlButton" to="/dashboard" tag="button">
            <b-icon icon="close" size="is-medium"></b-icon>
          </router-link>
        </div>
      </nav>
    </footer>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form v-on:workout="addWorkout"></workout-form>
    </b-modal>
  </section>
</template>

<script>
import WorkoutSets from '@/components/WorkoutSets'
import WorkoutForm from '@/components/WorkoutForm'

export default {
  components: { 
    WorkoutForm,
    WorkoutSets
  },
  data() {
    return {
      session: [],
      isFormActive: false,
      controlButton: [
        'button',
        'is-fullwidth',
        'is-large',
        'is-text',
        'has-text-grey-dark'
      ]
    }
  },
  methods: {
    addWorkout(workout) {
      this.$toast.open({
        message: 'Good job!',
        type: 'is-primary'
      })
      this.session.unshift(workout)
    },
    removeWorkout(i) {
      this.session.splice(i, 1)
    },
    saveSession() {
      this.$store.dispatch('sessionCollection/insert', {
        workout: this.session
      }).then(() => {
          this.$toast.open({
            message: 'Session saved',
            type: 'is-success'
          })
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
footer.controls {
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eee;
}
.session {
  header {
    margin-bottom: 1em;
  }
}
</style>

