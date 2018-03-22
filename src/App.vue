<template>
  <div id="app">
    <h1>SWOL</h1>
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <fieldset>
        <select v-model="exercise" required>
          <option disabled selected value>Select workout</option>
          <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
        </select>
        <label>Weight</label>
        <input type="number" v-model.number="weight" min="0" step="5">
        <label>Sets</label>
        <input type="number" v-model.number="sets" min="1" required>
        <label>Reps</label>
        <input type="number" v-model.number="reps" min="1" required>
        <button type="submit">Add Workout</button>
      </fieldset>
    </form>
    <h4>Workout session</h4>
    <template v-if="sessions.length > 0">
      <ul>
      <li v-for="(workout, index) in sessions" :key="index">
        <h5>{{ workout.exercise }} <small>({{ workout.weight ? workout.weight + 'lbs' : 'bodyweight' }})</small></h5>
        <span>{{ workout.sets }} sets x {{ workout.reps }} reps</span>
        <button @click="deleteWorkout(index)">delete</button>
      </li>
      </ul>
      <h4>Nice, keep going!</h4>
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
    },
    deleteWorkout: function (key) {
      this.sessions.splice(key, 1)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 1em 2em
}
h5 {
  margin: 0
}
input {
  width: 40px
}
</style>
