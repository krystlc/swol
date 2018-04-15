<template>
  <form @submit.prevent="handleSubmit" action="#" method="post">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add workout</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Exercise">
          <b-autocomplete
            v-model="exercise"
            placeholder="e.g. Pull-ups"
            :keep-first="keepFirst"
            :data="filteredDataObj"
            field="name"
            @select="option => selected = option"
            required
            expanded>
            <template slot="empty">No results found</template>
          </b-autocomplete>
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
export default {
  props: ['list'],
  data () {
    return {
      keepFirst: true,
      exercise: '',
      weight: null,
      sets: 3,
      reps: 10,
      resistance: false,
      selected: null
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
  },
  computed: {
    filteredDataObj () {
      return this.list.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(this.exercise.toLowerCase()) >= 0
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
