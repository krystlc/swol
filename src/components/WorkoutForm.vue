<template>
  <form @submit.prevent="handleSubmit" action="#" method="post">
    <b-field grouped group-multiline>
      <b-select v-model="exercise" required>
        <option v-for="(exName, index) in $options.exList" :key="index">{{ exName }}</option>
      </b-select>
      <b-input type="number" v-model.number="weight" min="0" step="5"></b-input>
      <b-input type="number" v-model.number="sets" min="1" required></b-input>
      <b-input type="number" v-model.number="reps" min="1" required></b-input>
      <p class="control">
        <button type="submit" class="button is-primary" @click="$parent.close()">Add Workout</button>
      </p>
    </b-field>
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
      reps: 10
    }
  },
  methods: {
    handleSubmit: function () {
      this.$emit('workout', {
        exercise: this.exercise,
        weight: this.weight,
        sets: this.sets,
        reps: this.reps
      })
      this.weight = null
    }
  }
}
</script>
