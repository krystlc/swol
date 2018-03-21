<template>
  <form @submit.prevent="handleSubmit" action="#" method="post">
    <select v-model="name">
      <option>Push ups</option>
      <option>Pull ups</option>
      <option>Chin ups</option>
      <option>Stand ups</option>
    </select>
    <input type="number" v-model.number="weight">
    <input type="number" v-model.number="sets">
    <input type="number" v-model.number="reps">
    <button type="submit">Save Workout</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: 'Chin ups',
      weight: null,
      sets: null,
      reps: null,
      isEdit: false
    }
  },
  methods: {
    handleSubmit: () => {
    }
  }
}
</script>

<style scoped>
input {
  width: 40px;
}
</style>
