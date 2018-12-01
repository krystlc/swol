<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Current Session</h2>
      <h3 class="subtitle">{{ session.created.seconds | moment("dddd, MMMM Do YYYY")}}</h3>
      <b-table :data="session.workout">
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
            <button class="button is-small is-borderless" @click="edit(props)">
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
              <button class="button" @click="isFormActive = true">
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
      <workout-form @workout="handleWorkout"/>
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
      session: [],
      isFormActive: false
    }
  },
  created() {
    sessionCollection.doc(this.id).onSnapshot(doc => {
      this.session = doc.data()
    })
  },
  methods: {
    handleWorkout(payload) {
      this.$store.dispatch('addSessionWorkout', payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    },
    edit(row) {
      alert('hi', row.index)
    },
    deleteSession() {
      sessionCollection.doc(this.id).delete().then(() => {
        this.$router.push('/dashboard')
      }).catch(() => {
        alert('looks like there was an error')
      })
    }
  }
}
</script>
