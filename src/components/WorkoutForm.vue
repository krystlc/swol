<template>
  <div class="workout-form">
    <form @submit.prevent="handleSubmit" action="#" method="post">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Add workout</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Exercise">
            <b-autocomplete
              v-model="workout.exercise"
              placeholder="e.g. Pull-ups"
              :keep-first="keepFirst"
              :data="filteredDataObj"
              field="name"
              @select="option => option === workout.selected"
              required
              expanded>
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>
          <b-field label="Weight" class="nums">
            <b-input type="number" v-model.number="workout.weight" min="0"></b-input>
          </b-field>
          <b-field grouped class="nums">
            <b-field label="Sets">
              <b-input type="number" v-model.number="workout.sets" min="1" required></b-input>
            </b-field>
            <b-field label="Reps">
              <b-input type="number" v-model.number="workout.reps" min="1" required></b-input>
            </b-field>
          </b-field>
          <b-checkbox v-model="workout.resistance">Resistance band</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-primary" @click="$parent.close()">Add Workout</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { exerciseStore as exercises, db } from '../main.js'

const workout = {
  exercise: '',
  weight: null,
  sets: 3,
  reps: 10,
  resistance: false,
  selected: null
}

export default {
  data() {
    return {
      workout,
      exercises,
      keepFirst: true,
    }
  },
  methods: {
    handleSubmit() {
      const created = new Date()
      db.collection('sessions').add({ workout, created })
        .then(res => {
          console.log(res, 'posted')
        })
        .catch(err =>{
          console.error(err)
        })
      this.workout.weight = null
    },
    handleWorkout: function(payload) {
      this.session.unshift(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    },
    deleteWorkout: function(key) {
      this.session.splice(key, 1)
    }
  },
  computed: {
    filteredDataObj() {
      return this.exercises.data.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.workout.exercise.toLowerCase()) >= 0
        )
      })
    }
  }
}
</script>

<style scoped>
.field.nums .field {
  width: 90px;
}
</style>
