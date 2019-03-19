<template>
  <section class="section">
    <div class="container">
      <pre>{{ session }}</pre>
      <div class="level">
        <div class="level-left">
          <h2 class="title level-item">{{ session.created_at.seconds | moment('dddd') }}</h2>
          <h3 class="subtitle level-item">{{ session.created_at.seconds | moment('MMMM Do YYYY') }}</h3>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-field grouped>
              <p class="control">
                <button class="button" @click="addWorkout">
                  <b-icon icon="plus"></b-icon>
                  <span>Add workout</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="deleteSession">
                  <b-icon icon="delete"></b-icon>
                </button>
              </p>
            </b-field>
          </div>
        </div>
      </div>
      <b-table :data="session.workout" narrowed hoverable>
        <template slot-scope="props">
          <b-table-column field="exercise" label="Exercise">
            {{ props.row.exercise }}
          </b-table-column>
          <b-table-column field="sets" label="Sets">
            <p v-if="props.row.weight">
              {{ props.row.weight }} lbs
            </p>
            <p v-for="(set, i) in props.row.sets" :key="i" v-else>
              <span>{{ set.weight }} lbs</span> / <span>{{ set.reps }} reps</span>
            </p>
          </b-table-column>
          <b-table-column field="resistance" label="Resistance" centered width="40">
            {{ props.row.resistance }}
          </b-table-column>
          <b-table-column width="40">
            <button class="button is-small is-borderless" @click="deleteWorkout(props.index)">
              <b-icon icon="delete"></b-icon>
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
      </b-table>
    </div>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form :id="id"></workout-form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkoutForm from '@/components/WorkoutForm'

export default {
  props: ['id'],
  components: { WorkoutForm },
  data() {
    return {
      isFormActive: false
    }
  },
  mounted() {
    if (!this.storedSession(this.id)) {
      this.$store.dispatch('sessionDoc/openDBChannel', {docId: this.id})
    }
  },
  beforeDestroy() {
    if (!this.storedSession(this.id)) {
      this.$store.dispatch('sessionDoc/closeDBChannel', {clearModule: true})
    }
  },
  computed: {
    ...mapGetters('sessionCollection', ['storedSession']),
    ...mapGetters('sessionDoc', ['fetchedSession']),
    session() {
      let session = this.storedSession(this.id)
      return session ? session : this.fetchedSession
    }
  },
  methods: {
    addWorkout() {
      this.isFormActive = true
    },
    // deleteWorkout(row) {
      // this.session.workout.splice(row, 1)
      // const sess = sessionCollection.doc(this.id)
      // sess.update({
      //   workout: this.session.workout
      // })
    // },
    // deleteSession() {
      // sessionCollection.doc(this.id).delete().then(() => {
      //   this.$router.push('/dashboard')
      // }).catch(() => {
      //   // TODO: Replace with a toast message
      //   alert('looks like there was an error')
      // })
    // },
  }
}
</script>
