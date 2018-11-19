<template>
  <section class="section">
    {{ id }}
    <div class="container">
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
      <workout-table :data="currentSession" v-if="currentSession.length > 0">
<template slot="bottom-left">
                        <b>Total checked</b>:
                    </template>
      </workout-table>
    </div>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form @workout="handleWorkout"/>
    </b-modal>
  </section>
</template>

<script>
import WorkoutForm from '@/components/WorkoutForm'
import WorkoutTable from '@/components/WorkoutTable'
import { sessionCollection } from '@/firebaseConfig.js'

export default {
  props: ['id'],
  components: { WorkoutTable, WorkoutForm },
  data() {
    return {
      currentSession: [],
      isFormActive: false
    }
  },
  methods: {
    saveSession() {
      if (this.currentUser) {
        let created = new Date()
        sessionCollection.add({
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
    },
    handleWorkout: function (payload) {
      this.currentSession.push(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    }
  }
}
</script>
