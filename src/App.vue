<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">SWOL</h1>
          <h2 class="subtitle">Log those gains</h2>
        </div>
      </div>
    </section>
    <hr>
    <section class="section is-paddingless">
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <div class="container level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-6">Exercise</p>
          </div>
          <div class="level-item">
              <b-field>
                <b-select placeholder="Select exercise" v-model="exercise" required>
                  <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
                </b-select>
              </b-field>
          </div>
          <div class="level-item">
            <p class="subtitle is-6">Weight</p>
          </div>
          <div class="level-item">
              <b-field>
                <b-input type="number" v-model.number="weight" min="0" step="5"></b-input>
              </b-field>
          </div>
          <div class="level-item">
            <p class="subtitle is-6">Sets</p>
          </div>
          <div class="level-item">
              <b-field>
                <b-input type="number" v-model.number="sets" min="1" required></b-input>
              </b-field>
          </div>
          <div class="level-item">
            <p class="subtitle is-6">Reps</p>
          </div>
          <div class="level-item">
              <b-field>
                <b-input type="number" v-model.number="reps" min="1" required></b-input>
              </b-field>
          </div>
          <div class="level-item">
            <button type="submit" class="button is-primary">Add Workout</button>
          </div>
        </div>
      </div>
    </form>
    </section>
    <hr>
    <section class="section">
      <div class="container is-medium">
        <h1 class="title">Workout session</h1>
        <template v-if="sessions.length > 0">
          <div class="tile is-ancestor">
            <div class="tile is-parent" v-for="(workout, index) in sessions" :key="index">
              <div class="tile is-child box">
                <button @click="deleteWorkout(index)" class="delete is-pulled-right"></button>
                <p class="title is-4">{{ workout.exercise }} <small>({{ workout.weight ? workout.weight + 'lbs' : 'bodyweight' }})</small></p>
                <p class="subtitle is-5">{{ workout.sets }} sets x {{ workout.reps }} reps</p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <h5>What a loser, you haven't done shit.</h5>
        </template>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p><strong>SWOL</strong> 2018.</p>
        </div>
      </div>
    </footer>
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
