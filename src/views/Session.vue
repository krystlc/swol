<template>
  <section class="section">
    <div class="container">
      <workout-table :data="currentSession"></workout-table>
    </div>
    <b-field grouped>
      <p class="control">
        <button class="button" @click="isFormActive = true">
          <b-icon icon="plus"></b-icon>
          <span>Add workout</span>
        </button>
      </p>
      <p class="control">
        <button class="button is-primary" @click="saveSession" :disabled="currentSession.length > 0 ? false : true">
          <b-icon icon="content-save-all"></b-icon>
          <span>Save session</span>
        </button>
      </p>
    </b-field>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form @workout="handleWorkout"/>
    </b-modal>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import WorkoutForm from '@/components/WorkoutForm'
import WorkoutTable from '@/components/WorkoutTable'
import { firebase, sessionCollection, userCollection } from '@/firebaseConfig.js'

export default {
  props: ['id'],
  components: { WorkoutTable, WorkoutForm },
  data() {
    return {
      currentSession: [],
      isFormActive: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    saveSession() {
      let created = new Date()
      sessionCollection
        .add({
          created,
          uid: this.currentUser.uid,
          session: this.currentSession
        })
        .then((result) => {
          this.$toast.open({
            message: 'Session saved!',
            type: 'is-success'
          })
          userCollection.doc(this.currentUser.uid).update({
            'sessions': firebase.firestore.FieldValue.arrayUnion({id: result.id, created})
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
    },
    handleWorkout: function(payload) {
      this.currentSession.push(payload)
      this.$toast.open({
        message: 'Nice, keep going!',
        type: 'is-success'
      })
    }
  }
}
</script>
