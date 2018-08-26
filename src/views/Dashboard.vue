<template>
  <section class="section">
    <div class="container">
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
        <workout-table v-for="(data, i) in userSessions" :key="i" :data="data.session">
          <a class="delete is-pulled-right" @click="deleteSession(data.id)"></a>
          <h5>{{ data.created.seconds | moment("dddd, MMMM Do YYYY, h:mma") }}</h5>
        </workout-table>
        <span v-if="!userSessions">Empty :(</span>
      </div>
      <b-modal :active.sync="isFormActive" has-modal-card>
        <workout-form @workout="handleWorkout"/>
      </b-modal>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import WorkoutTable from '@/components/WorkoutTable'
import WorkoutForm from '@/components/WorkoutForm'
const fb = require('@/firebaseConfig.js')

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
    deleteSession(id) {
      fb.sessionCollection.doc(id).delete()
    },
    handleWorkout: function (payload) {
      this.currentSession.push(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    },
    saveSession() {
      if (this.currentUser) {
        let created = new Date()
        fb.sessionCollection.add({
          created,
          uid: this.currentUser.uid,
          session: this.currentSession
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
      } else {
        this.$toast.open({
          duration: 5000,
          message: 'Dude, you gotta sign in first!',
          type: 'is-warning'
        })
      }
    }
  }
}
</script>
