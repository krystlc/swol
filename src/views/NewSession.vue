<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <article class="media" id="session">
          <div class="media-content">
            <header class="level is-mobile">
              <h2 class="title">
                New session
              </h2>
              <div>
                <button class="button is-fullwidth" @click="isFormActive = true">
                  Add Workout
                </button>
              </div>
            </header>
            <div class="content">
              <div v-for="(workout, i) in session" :key="`workout-${i}`">
                <b-field label="Exercise">
                  <b-input v-model="workout.exercise"></b-input>
                </b-field>
                <div class="columns is-mobile is-variable is-1" v-for="(set, j) in workout.sets" :key="`set-${j}`">
                  <div class="column is-2">
                    <b-field>
                      <b-input :value="++j" disabled></b-input>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field>
                      <b-input type="number" placeholder="Weight" v-model.number="set.weight" min="0"></b-input>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field>
                      <b-input type="number" placeholder="Reps" v-model.number="set.reps" min="1" required></b-input>
                    </b-field>
                  </div>
                  <div class="column has-text-right">
                    <button class="button is-text is-info is-inverted" v-if="j === workout.sets.length" @click="addSet(i)">
                      <b-icon icon="plus"></b-icon>
                    </button>
                    <button class="button" v-else @click="removeSet(i, j)">
                      <b-icon icon="minus"></b-icon>
                    </button>
                  </div>
                </div>
              </div>
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
const session = [
  {
    exercise: '',
    resistance: false,
    sets: [
      {
        weight: 0,
        reps: 10
      }
    ]
  }
]

import WorkoutForm from '@/components/WorkoutForm'

export default {
  components: { WorkoutForm },
  data() {
    return {
      session,
      keepFirst: true,
      isFormActive: false
    }
  },
  methods: {
    addSet(exercise) {
      const workout = this.session[exercise]
      const lastSet = workout.sets[workout.sets.length -1]
      const newSet = {
        reps: lastSet.reps,
        weight: lastSet.weight
      }
      workout.sets.push(newSet)
    },
    removeSet(exercise, set) {
      const workout = this.session[exercise]
      workout.sets.splice(set - 1, 1)
    },
    addWorkout(workout) {
      console.log(workout)
      this.session.unshift(workout)
    }
  }
}
</script>

<style lang="scss">
#session .columns {
  margin-bottom: 0;
}
</style>
