<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Current Session</h2>
      <h3 class="subtitle" v-if="session">{{ session.created.seconds | moment("dddd, MMMM Do YYYY")}}</h3>
      <b-table :data="session.workout" v-if="session">
        <template slot-scope="props">
          <b-table-column field="exercise" label="Exercise">
            {{ props.row.exercise }}
          </b-table-column>
          <b-table-column field="weight" label="Weight" numeric centered width="40">
            {{ props.row.weight }}<span v-if="props.row.weight">lbs</span>
          </b-table-column>
          <b-table-column field="sets" label="Sets" numeric centered width="40">
            {{ props.row.sets }}
          </b-table-column>
          <b-table-column field="reps" label="Reps" numeric centered width="40">
            {{ props.row.reps }}
          </b-table-column>
          <b-table-column field="resistance" label="Resistance" centered width="40">
            {{ props.row.resistance }}
          </b-table-column>
          <b-table-column width="40">
            <button class="button is-small is-borderless" @click="editWorkout(props.row)">
              <b-icon icon="pencil"></b-icon>
            </button>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>Empty</p>
            </div>
          </section>
        </template>
        <template slot="footer">
          <b-field grouped>
            <p class="control">
              <button class="button" @click="addWorkout">
                <b-icon icon="plus"></b-icon>
                <span>Add workout</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-warning" @click="deleteSession">
                <b-icon icon="delete"></b-icon>
                <span>Delete</span>
              </button>
            </p>
          </b-field>
        </template>
      </b-table>
    </div>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form :id="id" :row="row"></workout-form>
    </b-modal>
  </section>
</template>

<script>
import { sessionCollection } from '@/firebaseConfig'
import WorkoutForm from '@/components/WorkoutForm'

export default {
  props: ['id'],
  components: { WorkoutForm },
  data() {
    return {
      row: null,
      session: null,
      isFormActive: false
    }
  },
  created() {
    sessionCollection.doc(this.id).onSnapshot(doc => {
      this.session = doc.data()
    })
  },
  methods: {
    addWorkout() {
      this.row = null
      this.isFormActive = true
    },
    editWorkout(row) {
      if(!row.start) return
      this.row = row
      this.isFormActive = true
    },
    deleteSession() {
      sessionCollection.doc(this.id).delete().then(() => {
        this.$router.push('/dashboard')
      }).catch(() => {
        // TODO: Replace with a toast message
        alert('looks like there was an error')
      })
    },
  }
}
</script>
