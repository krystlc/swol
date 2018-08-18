<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title">SWOL</h1>
              <h5 class="subtitle">Do you even swol?</h5>
            </div>
            <div class="column">
              <div>
                <b-field grouped>
                  <p class="control">
                    <button class="button is-primary is-medium" @click="isFormActive = true">
                      <b-icon icon="plus"></b-icon>
                    </button>
                  </p>
                </b-field>
                <b-modal :active.sync="isFormActive" has-modal-card>
                  <workout-form/>
                </b-modal>
              </div>
                <div class="" v-for="(session, i) in sessions" :key="i">
                  <div class="box">
                    <button @click="deleteWorkout(session.id)" class="delete is-pulled-right"></button>
                    <p class="title is-5">{{ session.workout.exercise }} <small v-if="session.workout.weight">({{ session.workout.weight }} lbs)</small></p>
                    <p class="subtitle is-6">{{ session.workout.sets }} sets x {{ session.workout.reps }} reps <small v-if="session.workout.resistance">with resistance band</small></p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from './main.js'
import workoutForm from '@/components/WorkoutForm'

export default {
  components: { workoutForm },
  name: 'app',
  data() {
    return {
      sessions: [],
      isFormActive: false
    }
  },
  firestore() {
    return {
      sessions: db.collection('sessions').orderBy('created')
    }
  },
  methods: {
    deleteWorkout(id) {
      db.collection('sessions').doc(id).delete()
    }
  }
}
</script>

<style scoped>
.box {
  margin-bottom: 0.5em;
}
</style>
