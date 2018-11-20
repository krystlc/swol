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
              v-model="exercise"
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
            <b-input type="number" v-model.number="userSettings.weight" min="0" ref="weight"></b-input>
          </b-field>
          <b-field grouped class="nums">
            <b-field label="Sets">
              <b-input type="number" v-model.number="userSettings.sets" min="1" ref="sets" required></b-input>
            </b-field>
            <b-field label="Reps">
              <b-input type="number" v-model.number="userSettings.reps" min="1" ref="reps" required></b-input>
            </b-field>
          </b-field>
          <b-checkbox v-model="resistance">Resistance band</b-checkbox>
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      exercise: '',
      selected: null,
      resistance: false,
      keepFirst: true
    }
  },
  computed: {
    ...mapState(['currentUser','exerciseList', 'userSettings']),
    filteredDataObj() {
      return this.exerciseList.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.exercise.toLowerCase()) >= 0
        )
      })
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('workout', {
        settings: {
          exercise: this.exercise,
          weight: this.$refs.weight.value,
          sets: this.$refs.sets.value,
          reps: this.$refs.reps.value,
          resistance: this.resistance
        }
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
