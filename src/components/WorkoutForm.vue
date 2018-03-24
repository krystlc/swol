<template>
  <form @submit.prevent="handleSubmit" action="#" method="post">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add workout</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Exercise">
          <b-select v-model="exercise" required expanded>
            <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
          </b-select>
        </b-field>
        <b-field label="Weight" class="nums">
          <b-input type="number" v-model.number="weight" min="0"></b-input>
        </b-field>
        <b-field grouped class="nums">
          <b-field label="Sets">
            <b-input type="number" v-model.number="sets" min="1" required></b-input>
          </b-field>
          <b-field label="Reps">
            <b-input type="number" v-model.number="reps" min="1" required></b-input>
          </b-field>
        </b-field>
        <b-checkbox v-model="resistance">Resistance band</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button type="submit" class="button is-primary" @click="$parent.close()">Add Workout</button>
      </footer>
    </div>
  </form>
</template>

<script>
import exerciseData from '../assets/exercises.json'

export default {
  name: 'workout-form',
  exList: exerciseData.exercises,
  data () {
    return {
      exercise: '',
      weight: null,
      sets: 3,
      reps: 10,
      resistance: false
    }
  },
  methods: {
    handleSubmit: function () {
      this.$emit('workout', {
        exercise: this.exercise,
        weight: this.weight,
        sets: this.sets,
        reps: this.reps,
        resistance: this.resistance
      })
      this.weight = null
    }
  }
}
</script>

<style scoped>
.field.nums .field {
  width: 90px
}
</style>
