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
          <b-table :data="workout.sets" :mobile-cards="false">
            <template slot-scope="props">
              <b-table-column label="Set" width="60">
                <b-input :value="++props.index" disabled></b-input>
              </b-table-column>
              <b-table-column label="Weight">
                <b-input type="number" v-model.number="props.row.weight" min="0" ref="weight"></b-input>
              </b-table-column>
              <b-table-column label="Reps">
                <b-input type="number" v-model.number="props.row.reps" min="1" ref="reps" required></b-input>
              </b-table-column>
              <b-table-column width="30">
                <button class="button is-danger is-inverted" @click.prevent="removeSet(props.index)" v-if="props.index > 1">
                  <b-icon icon="close"></b-icon>
                </button>
              </b-table-column>
            </template>
            <template slot="footer">
              <b-field grouped position="is-right">
                <button class="button" @click.prevent="addSet"><b-icon icon="plus"></b-icon><span>Add set</span></button>
              </b-field>
            </template>
          </b-table>
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
import { fieldValue, sessionCollection, userCollection } from '@/firebaseConfig'

export default {
  props: ['id','row'],
  data() {
    return {
      exercise: '',
      resistance: false,
      sets: [
        {
          weight: 0,
          reps: 8
        }
      ],
      selected: null,
      keepFirst: true
    }
  },
  mounted() {
    if(this.row) {
      this.exercise = this.row.exercise
      this.sets = this.row.sets
      this.resistance = this.row.resistance
    } else {
      console.log('maybe i should remove this `row` thing?')
    }
  },
  computed: {
    ...mapGetters(['getExerciseList', 'getSettings', 'getMaxWeight', 'getUserId']),
    workout() {
      return {
        exercise: this.exercise,
        resistance: this.resistance,
        sets: this.sets,
      }
    },
    filteredDataObj() {
      return this.getExerciseList.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.exercise.toLowerCase()) >= 0
        )
      })
    }
  },
  watch: {
    exercise(newEx, oldEx) {
      this.checkLastMax(newEx)
    }
  },
  methods: {
    addSet() {
      const lastSet = this.sets[this.sets.length - 1]
      const newSet = {
        reps: lastSet.reps,
        weight: lastSet.weight
      }
      this.sets.push(newSet)
    },
    removeSet(item) {
      this.sets.splice(item - 1, 1)
    },
    saveWorkout() {
      const workout = this.workout
      workout.start = new Date()
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayUnion(workout)
      }).then(() => {
        this.setNewMax()
        this.$parent.close()
      }).catch(err => {
        console.log('woops', err)
      }) 
    },
    updateWorkout() {
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayRemove(this.row)
      }).then(() => {
        session.update({
          workout: fieldValue.arrayUnion(this.workout)
        }).then(() => {
          this.$parent.close()
        }).catch(err => {
          console.log('woops', err)
        })
      }).catch(err => {
        console.log('woops', err)
      })
    },
    deleteWorkout() {
      const session = sessionCollection.doc(this.id)
      session.update({
        workout: fieldValue.arrayRemove(this.row)
      }).then(() => {
        this.$parent.close()
      }).catch(err => {
        console.log('woops', err)
      })
    },
    checkLastMax(newEx) {
      console.log(this.exercise, newEx)
      if (this.exercise in this.getMaxWeight) {
        this.sets[0].weight = this.getMaxWeight[this.exercise]
      } else {
        console.log(false, this.exercise, this.getMaxWeight)
      }
    },
    setNewMax() {
      const newMax = Math.max.apply(Math, this.sets.map(m => m.weight))
      if (newMax > this.getMaxWeight[this.exercise] || !this.getMaxWeight[this.exercise]) {
        const maxWeight = JSON.parse(JSON.stringify(this.getMaxWeight))
        maxWeight[this.exercise] = newMax
        console.log(maxWeight)
        const user = userCollection.doc(this.getUserId).update({ maxWeight }).then(() => {
          console.log('new max set')
        }).catch(err => {
          console.log('could not set new max', err)
        })
      } else {
        return
      }
    }
  }
}
</script>
