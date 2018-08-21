<template>
  <div class="session">
    <slot></slot>
    <b-table :data="data" :columns="columns"></b-table>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      columns: [
        {
          field: 'exercise',
          label: 'Exercise'
        },
        {
          field: 'weight',
          label: 'Weight',
          numeric: true,
          centered: true,
          width: '40'
        },
        {
          field: 'sets',
          label: 'Sets',
          numeric: true,
          centered: true,
          width: '40'
        },
        {
          field: 'reps',
          label: 'Reps',
          numeric: true,
          centered: true,
          width: '40'
        },
        {
          field: 'resistance',
          label: 'Resistance',
          centered: true,
          width: '80'
        }
      ]
    }
  }
}
</script>

<style>
.session {
  margin-bottom: 2em;
}
.session h5 {
  margin-bottom: 0.5em;
}
</style>
