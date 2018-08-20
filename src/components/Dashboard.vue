<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <div class="current-session">
        <h5 class="subtitle">Current Session</h5>
        <b-field grouped>
          <p class="control">
            <button class="button" @click="isFormActive = true">
              <b-icon icon="plus"></b-icon> <span>Add workout</span>
            </button>
          </p>
          <p class="control">
            <button class="button is-primary" @click="saveSession" :disabled="currentSession.length > 0 ? false : true">
              <b-icon icon="content-save-all"></b-icon> <span>Save session</span>
            </button>
          </p>
        </b-field>
        <workout-table :data="currentSession" v-if="currentSession.length > 0"/>
        <hr v-else>
      </div>
      <div class="past-sessions">
        <h5 class="subtitle">Past Sessions</h5>
        <template v-if="userSessions">
          <workout-table v-for="(data, i) in userSessions" :key="i" :data="data.session">
            <h5>{{ data.created.seconds | moment("dddd, MMMM Do YYYY, h:mma") }}</h5>
          </workout-table>
        </template>
        <span v-else>Nothing to see here.</span>
      </div>
      <b-modal :active.sync="isFormActive" has-modal-card>
        <workout-form @workout="handleWorkout"/>
      </b-modal>
    </div>
    <pre>{{ userSessions }}</pre>
    <pre>{{ currentUser }}</pre>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import WorkoutTable from '@/components/WorkoutTable'
import WorkoutForm from '@/components/WorkoutForm'

let db 

export default {
  components: { WorkoutTable, WorkoutForm },
  data() {
    return {
      currentSession: [],
      isFormActive: false
    }
  },
  computed: {
    ...mapState(['currentUser','userSessions'])
  },
  methods: {
    handleWorkout: function (payload) {
      this.currentSession.push(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    },
    deleteWorkout(id) {
      db.collection('sessions').doc(id).delete()
    },
    saveSession() {
      let date = new Date()
      db.collection('sessions').add({
          session: this.currentSession,
          created: date
        })
        .then(() => {
          this.$toast.open({
            message: 'Session saved!',
            type: 'is-success'
          })
          this.currentSession = []
        })
        .catch(err => {
          this.$toast.open({
            duration: 5000,
            message: `Oops! ${err.code}. Did you sign in?`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
