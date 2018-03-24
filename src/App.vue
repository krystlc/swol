<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-2">SWOL</h1>
              <h5 class="subtitle is-5">Do you even swol?</h5>
            </div>
            <div class="column">
              <form @submit.prevent="handleSubmit" action="#" method="post">
                <b-field grouped>
                <b-field label="Exercise">
                  <b-select v-model="exercise" required>
                    <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
                  </b-select>
                </b-field>
                <b-field label="Weight">
                  <b-input type="number" v-model.number="weight" min="0" step="5"></b-input>
                </b-field>
                <b-field label="Sets">
                  <b-input type="number" v-model.number="sets" min="1" required></b-input>
                </b-field>
                <b-field label="Reps">
                  <b-input type="number" v-model.number="reps" min="1" required></b-input>
                </b-field>
                <b-field label="-">
                <button type="submit" class="button">Add Workout</button>
                </b-field>
                </b-field>
              </form>
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
import exerciseData from './assets/exercises.json'

export default {
  name: 'App',
  exList: exerciseData.exercises,
  data () {
    return {
      exercise: '',
      weight: null,
      sets: 3,
      reps: 10,
      sessions: []
    }
  },
  methods: {
    handleSubmit: function () {
      this.sessions.unshift({
        exercise: this.exercise,
        weight: this.weight,
        sets: this.sets,
        reps: this.reps
      })
      this.weight = null
    },
    deleteWorkout: function (key) {
      this.sessions.splice(key, 1)
    }
  }
}
</script>

<style>
.control .input {
  width: 80px;
}
</style>
