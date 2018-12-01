<template>
  <div class="workout-form">
    <form>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Add workout</p>
          <button class="button is-text" type="button" @click="deleteWorkout" v-if="row">
            <b-icon icon="delete"></b-icon>
          </button>
        </header>
        <section class="modal-card-body">
          <b-field label="Exercise">
            <b-autocomplete
              v-model="workout.exercise"
              placeholder="e.g. Pull-ups"
              :keep-first="keepFirst"
              :data="filteredDataObj"
              field="name"
              @select="option => option === selected"
              required
              expanded>
              <template slot="empty">No results found</template>
            </b-autocomplete>
          </b-field>
          <b-field label="Weight" class="nums">
            <b-input type="number" v-model.number="workout.weight" min="0" ref="weight"></b-input>
          </b-field>
          <b-field grouped class="nums">
            <b-field label="Sets">
              <b-input type="number" v-model.number="workout.sets" min="1" ref="sets" required></b-input>
            </b-field>
            <b-field label="Reps">
              <b-input type="number" v-model.number="workout.reps" min="1" ref="reps" required></b-input>
            </b-field>
          </b-field>
          <b-checkbox v-model="workout.resistance">Resistance band</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click.prevent="saveWorkout" v-if="!row">Save</button>
          <button class="button is-primary" @click.prevent="updateWorkout" v-else>Update</button>
          <button class="button" type="button" @click.prevent="$parent.close()">Close</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fieldValue, sessionCollection } from '@/firebaseConfig'

export default {
  props: ['id','row'],
  data() {
    return {
      workout: {
        exercise: '',
        reps: '',
        resistance: false,
        sets: '',
        weight: ''
      },
      selected: null,
      keepFirst: true
    }
  },
  mounted() {
    if(this.row) {
      this.workout = JSON.parse(JSON.stringify(this.row))
    } else {
      this.workout.reps = this.getSettings.reps
      this.workout.sets = this.getSettings.sets
      this.workout.weight = this.getSettings.weight
    }
  },
  computed: {
    ...mapGetters(['getExerciseList', 'getSettings']),
    filteredDataObj() {
      return this.getExerciseList.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.workout.exercise.toLowerCase()) >= 0
        )
      })
    }
  },
  methods: {
    saveWorkout() {
      const workout = this.workout
      workout.start = new Date()
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayUnion(workout)
      })
      this.$parent.close()
    },
    updateWorkout() {
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayRemove(this.row)
      })
      session.update({
        workout: fieldValue.arrayUnion(this.workout)
      })
      this.$parent.close()
    },
    deleteWorkout() {
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayRemove(this.row)
      })
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
.field.nums .field {
  width: 90px;
}
</style>
