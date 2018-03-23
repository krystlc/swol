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
    <section class="section">
      <div class="container">
        <h1 class="title">Workout session</h1>
        <template v-if="sessions.length > 0">
          <div class="tile" v-for="(workout, index) in sessions" :key="index">
            <h5>{{ workout.exercise }} <small>({{ workout.weight ? workout.weight + 'lbs' : 'bodyweight' }})</small></h5>
            <span>{{ workout.sets }} sets x {{ workout.reps }} reps</span>
            <button @click="deleteWorkout(index)">delete</button>
          </div>
        </template>
        <template v-else>
          <h5>What a loser, you haven't done shit.</h5>
        </template>
      </div>
    </section>
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Exercise">
              <b-select placeholder="Select exercise" v-model="exercise" required>
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
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button type="submit" class="button is-primary">Add Workout</button>
        </footer>
      </div>
    </form>
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
    },
    deleteWorkout: function (key) {
      this.sessions.splice(key, 1)
    }
  }
}
</script>
