<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <article class="media" id="session">
          <div class="media-content">
            <header class="level is-mobile">
              <div class="level-left">
                <h2 class="is-size-4">
                  New session
                </h2>
              </div>
              <div class="level-right">
                <router-link class="delete" tag="button" to="/dashboard"></router-link>
              </div>
            </header>
            <div class="content">
              <div class="columns is-mobile">
                <div class="column">
                  <button class="button is-fullwidth" @click="isFormActive = true">
                    Add workout
                  </button>
                </div>
                <div class="column">
                  <button class="button is-fullwidth is-primary" @click="saveSession" :disabled="session.length === 0">
                    Save session
                  </button>
                </div>
              </div>
              <ul>
                <li v-for="(workout, i) in session" :key="`exercise-${i}`">
                  <span class="name">
                    {{ workout.exercise }}
                  </span>
                  <b-taglist v-for="(set, j) in workout.sets" :key="`exercise-${i}-set${j}`">
                    <b-tag type="is-white has-text-grey-light">
                      {{ ++j }}
                    </b-tag>
                    <b-tag type="is-white is-medium">
                      {{ set.weight }} <i class="has-text-grey">lbs</i>
                    </b-tag>
                    <b-tag type="is-white is-medium">
                      {{ set.reps }} <i class="has-text-grey">reps</i>
                    </b-tag>
                  </b-taglist>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
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
      isFormActive: false
    }
  },
  methods: {
    addWorkout(workout) {
      this.session.unshift(workout)
    },
    saveSession() {
      this.$store.dispatch('sessionCollection/insert', {
        workout: this.session
      })
    }
  }
}
</script>

<style lang="scss">
.content ul {
  margin-left: 0;
  
  li {
    list-style: none;
    line-height: 1.2;
    margin-bottom: 0.5em;

    .tag, .tags {
      margin-bottom: 0;
    }
  }
  li + li {
    margin-top: 0.5em;
    padding-top: 0.75em;
    border-top: 1px solid #eee;
  }
  .name {
    position: relative;
  }
}
</style>
