<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-2">SWOL</h1>
              <h5 class="subtitle is-5">Do you even swol?</h5>
              <b-field grouped>
                <p class="control">
                  <button class="button is-primary is-medium" @click="isFormActive = true">
                    <b-icon icon="plus"></b-icon>
                  </button>
                </p>
                <p class="control" v-if="session.length > 0">
                  <button class="button is-info is-medium" @click="handleSave">
                    <b-icon icon="content-save-all"></b-icon>
                  </button>
                </p>
              </b-field>
              <b-modal :active.sync="isFormActive" has-modal-card>
                <workout-form @workout="handleWorkout" :list="exercises"></workout-form>
              </b-modal>
            </div>
            <div class="column">
              <template v-if="session.length > 0">
                <div class="" v-for="(workout, index) in session" :key="index">
                  <div class="box">
                    <button @click="deleteWorkout(index)" class="delete is-pulled-right"></button>
                    <p class="title is-4">{{ workout.exercise }} <small v-if="workout.weight">({{ workout.weight }} lbs)</small></p>
                    <p class="subtitle is-5">{{ workout.sets }} sets x {{ workout.reps }} reps <small v-if="workout.resistance">with resistance band</small></p>
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
import axios from 'axios'
import workoutForm from '@/components/WorkoutForm'

export default {
  components: {workoutForm},
  name: 'app',
  data () {
    return {
      session: [],
      exercises: [],
      isFormActive: false
    }
  },
  created () {
    axios
      .get(`https://wger.de/api/v2/exercise/?language=2&limit=1000&status=2`)
      .then(response => {
        this.exercises = response.data.results
      })
      .catch(err => {
        this.errors.push(err)
      })
  },
  methods: {
    handleWorkout: function (payload) {
      this.session.unshift(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    },
    deleteWorkout: function (key) {
      this.session.splice(key, 1)
    },
    handleSave: function (data) {
      alert('nothing here yet', data)
    }
  }
}
</script>
