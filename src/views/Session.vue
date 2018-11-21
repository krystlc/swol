<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Current Session</h2>
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
              <button class="button is-primary" @click="this.$store.dispatch('saveSession')">
                <b-icon icon="check"></b-icon>
                <span>Save</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-warning" @click="del()">
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
  created() {
    this.$store.dispatch('loadSession', this.id)
  },
  computed: {
    ...mapGetters({
      session: 'getCurrentSession'
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
    del() {
      this.$store.dispatch('deleteSession', this.id).then(() => {
        this.$router.push('/dashboard')
      }).catch(() => {
        alert('did not work')
      })
    }
  }
}
</script>
