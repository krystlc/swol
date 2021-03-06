<template>
  <div class="modal-card" id="workoutForm">
    <header class="modal-card-head">
      <p class="modal-card-title">Add workout</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Exercise" expanded>
        <b-autocomplete
          ref="exercise"
          v-model="exercise"
          placeholder="e.g. Pull-ups"
          :keep-first="keepFirst"
          :data="filteredDataObj"
          field="name"
          @select="option => option === selected"
          required
        >
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>
      <b-table :data="sets" :mobile-cards="false">
        <template slot-scope="props">
          <b-table-column label="Set" width="60">
            <b-input :value="++props.index" disabled></b-input>
          </b-table-column>
          <b-table-column label="Weight">
            <b-input type="number" v-model.number="props.row.weight" min="0" @focus="clearValue"></b-input>
          </b-table-column>
          <b-table-column label="Reps">
            <b-input
              type="number"
              v-model.number="props.row.reps"
              min="1"
              required
              @focus="clearValue"
            ></b-input>
          </b-table-column>
          <b-table-column width="30">
            <button
              class="button is-info is-inverted"
              @click.prevent="addSet"
              v-if="props.index === sets.length"
            >
              <b-icon icon="plus"></b-icon>
            </button>
            <button class="button is-text" @click.prevent="removeSet(props.index)" v-else>
              <b-icon icon="minus"></b-icon>
            </button>
          </b-table-column>
        </template>
      </b-table>
      <hr>
      <b-field class="has-text-right">
        <b-checkbox v-model="resistance">Using resistance?</b-checkbox>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-primary"
        @click.prevent="saveWorkout"
        :disabled="exercise === ''"
      >Save</button>
      <button class="button" type="button" @click.prevent="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      exercise: "",
      resistance: false,
      sets: [
        {
          weight: 0,
          reps: 8
        }
      ],
      selected: null,
      keepFirst: true
    };
  },
  mounted() {
    this.$refs.exercise.focus();
  },
  computed: {
    ...mapGetters(["getExerciseList", "getMaxWeight"]),
    filteredDataObj() {
      return this.getExerciseList.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.exercise.toLowerCase()) >= 0
        );
      });
    },
    workout() {
      return {
        sets: this.sets,
        exercise: this.exercise,
        resistance: this.resistance
      };
    }
  },
  methods: {
    addSet() {
      const lastSet = this.sets[this.sets.length - 1];
      const newSet = {
        reps: lastSet.reps,
        weight: lastSet.weight
      };
      this.sets.push(newSet);
    },
    removeSet(item) {
      this.sets.splice(item - 1, 1);
    },
    saveWorkout() {
      this.$emit("workout", this.workout);
      this.$parent.close();
    },
    clearValue(e) {
      e.target.value = null;
    }
  }
};
</script>

<style lang="scss">
#workoutForm .field .field {
  margin-bottom: 0;
}
</style>

