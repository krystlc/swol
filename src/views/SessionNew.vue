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
          <div class="workout-list" v-if="session.length > 0">
            <div class="box" v-for="(workout, i) in session" :key="`workout-${i}`">
              <div class="columns is-vcentered is-mobile is-gapless">
                <div class="column is-11">
                  <h6>{{ workout.exercise }}</h6>
                  <b-taglist v-for="(set, j) in workout.sets" :key="`workout-${i}-set${j}`" class="is-marginless">
                    <b-tag type="is-white" class="has-text-grey-light">
                      {{ ++j }}
                    </b-tag>
                    <b-tag type="is-white" class="is-medium">
                      <template v-if="set.weight > 0">
                        {{ set.weight }} <i class="has-text-grey">lbs</i>
                      </template>
                      <template v-else>
                        Freeweight
                      </template>
                    </b-tag>
                    <b-tag type="is-white" class="is-medium">
                      {{ set.reps }} <i class="has-text-grey">reps</i>
                    </b-tag>
                  </b-taglist>
                </div>
                <div class="column">
                  <button class="delete" @click="removeWorkout(i)"></button>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-body has-text-centered has-background-light has-text-grey-light" v-else>
            <p>Click the <b-icon icon="plus" size="is-small"></b-icon> icon below</p>
          </div>
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
import WorkoutForm from '@/components/WorkoutForm'

export default {
  components: { WorkoutForm },
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
  .box {
    margin-bottom: 0.5em;
  }
  .tag {
    height: 1em;
  }
}
</style>

