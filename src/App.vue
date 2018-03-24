<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-2">SWOL</h1>
              <h5 class="subtitle is-5">Do you even swol?</h5>
              <workout-form v-on:workout="handleWorkout"></workout-form>
            </div>
            <div class="column">
              <template v-if="sessions.length > 0">
                <div class="" v-for="(workout, index) in sessions" :key="index">
                  <div class="box">
                    <button @click="deleteWorkout(index)" class="delete is-pulled-right"></button>
                    <p class="title is-4">{{ workout.exercise }} <small v-if="workout.weight">({{ workout.weight }} lbs)</small></p>
                    <p class="subtitle is-5">{{ workout.sets }} sets x {{ workout.reps }} reps</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
            <p class="has-text-centered has-text-grey-light">SWOL by Bad Hombres</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import workoutForm from '@/components/WorkoutForm'

export default {
  components: {
    workoutForm
  },
  name: 'App',
  data () {
    return {
      sessions: []
    }
  },
  methods: {
    handleWorkout: function (payload) {
      this.sessions.unshift(payload)
    },
    deleteWorkout: function (key) {
      this.sessions.splice(key, 1)
    }
  }
}
</script>
