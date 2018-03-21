<template>
  <div id="app">
    <h1>SWOL</h1>
    <hr>
    <h3>Sessions</h3>
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <select v-model="workout.name">
        <option>Push ups</option>
        <option>Pull ups</option>
        <option>Chin ups</option>
        <option>Stand ups</option>
      </select>
      <input type="number" v-model.number="workout.weight">
      <input type="number" v-model.number="workout.sets">
      <input type="number" v-model.number="workout.reps">
      <button type="submit">Save Workout</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      workout: {
        name: '',
        weight: null,
        sets: null,
        reps: null
      },
      sessions: []
    }
  },
  methods: {
    handleSubmit: () => {
      this.sessions.push({name: this.name})
      console.log(this.sessions)
    }
  }
}
</script>

<style scoped>
input {
  width: 60px
}
</style>
