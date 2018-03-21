<template>
  <div id="app">
    <h1>SWOL</h1>
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <fieldset>
        <select v-model="exercise">
          <option disabled selected value>Select workout</option>
          <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
        </select>
        <label>Weight</label>
        <input type="number" v-model.number="weight" min="0" step="5">
        <label>Sets</label>
        <input type="number" v-model.number="sets" min="1">
        <label>Reps</label>
        <input type="number" v-model.number="reps" min="1">
        <button type="submit">Add Workout</button>
      </fieldset>
    </form>
    <h3>Workout session</h3>
    <template v-if="sessions.length > 0">
      <div v-for="(workout, index) in sessions" :key="index">
        <span>{{ workout.name }} - {{ workout.weight }}lbs, {{ workout.sets }} sets and {{ workout.reps }} reps</span>
      </div>
      <h5>Nice, keep going!</h5>
    </template>
    <template v-else>
      <h5>What a loser, you haven't done shit.</h5>
    </template>
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
      sets: null,
      reps: null,
      sessions: []
    }
  },
  methods: {
    handleSubmit: function () {
      this.sessions.push({
        exercise: this.exercise,
        weight: this.weight,
        sets: this.sets,
        reps: this.reps
      })
    }
  }
}
</script>

<style scoped>
#app {
  padding: 2em
}
input {
  width: 80px
}
</style>
