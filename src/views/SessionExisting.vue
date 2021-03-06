<template>
  <section class="section">
    <div class="container">
      <!-- i think this will be the session card -->
      <article class="session">
        <header>
          <h2 class="subtitle" v-if="getDate">
            {{ getDate | moment('dddd') }}, <span class="is-size-7">{{ getDate | moment('MMMM Do YYYY') }}</span>
          </h2>
        </header>
        <div class="content">
          <workout-sets 
            :payload="session.workout" 
            :edit="edit" 
            >
          </workout-sets>
        </div>
      </article>
    </div>
    <footer class="controls has-background-white">
      <nav class="columns is-mobile is-gapless">
        <div class="column">
          <button :class="controlButton" @click="saveSession" :disabled="session.workout.length === 0 || !edit">
            <b-icon icon="check" size="is-medium"></b-icon>
          </button>
        </div>
        <div class="column">
          <button :class="controlButton" @click="editSession" v-if="!edit">
            <b-icon icon="pencil"></b-icon>
          </button>
          <button :class="controlButton" @click="isFormActive = true" v-else>
            <b-icon icon="plus" size="is-medium"></b-icon>
          </button>
        </div>
        <div class="column">
          <button :class="controlButton" @click="deleteSession" :disabled="!edit">
            <b-icon icon="close" size="is-medium"></b-icon>
          </button>
        </div>
      </nav>
    </footer>
    <b-modal :active.sync="isFormActive" has-modal-card>
      <workout-form v-on:workout="addWorkout"></workout-form>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkoutSets from '@/components/WorkoutSets'
import WorkoutForm from '@/components/WorkoutForm'

export default {
  props: ['id'],
  components: {
    WorkoutSets,
    WorkoutForm
  },
  data() {
    return {
      session: {
        workout: []
      },
      edit: false,
      isFormActive: false,
      controlButton: [
        'button',
        'is-fullwidth',
        'is-large',
        'is-text',
        'has-text-grey-dark'
      ]
    }
  },
  mounted() {
    const session = this.getSession(this.id)
    if (session) {
      this.session = session
    } else {
      try {
        this.$store.dispatch('sessionCollection/fetchAndAdd', {
          where: [['created_by', '==', '{userId}'], ['id', '==', this.id]]
        }).then(() => this.session = this.getSession(this.id))
      } catch (err) {
        this.$dialog.alert(err)
      }
    }
  },
  computed: {
    ...mapGetters('sessionCollection', ['getSession']),
    getDate() {
      if (this.session.hasOwnProperty('created_at')) {
        return this.session.created_at.seconds
      } else if (this.session.hasOwnProperty('created')) {
        return this.session.created.seconds
      } else {
        return false
      }
    }
  },
  methods: {
    addWorkout(workout) {
      this.$toast.open({
        message: 'Good job!',
        type: 'is-primary'
      })
      this.session.workout.unshift(workout)
    },
    removeWorkout(i) {
      this.session.workout.splice(i, 1)
    },
    saveSession() {
      this.$store.dispatch('sessionCollection/patch', this.session)
        .then(() => {
          this.$toast.open({
            message: 'Session saved',
            type: 'is-success'
          })
          this.$router.push('/dashboard')
        })
    },
    deleteSession() {
      this.$dialog.confirm({
        message: 'Are you sure?',
        onConfirm: () => {
          this.$store.dispatch('sessionCollection/delete', this.id)
            .then(() => {
              this.$toast.open('Session deleted')
              this.$router.push('/dashboard')
            })
        }
      })
    },
    editSession() {
      this.edit = true
      this.$snackbar.open({
        message: 'You can now edit this session',
        type: 'is-warning',
        actionText: 'Undo',
        queue: false,
        onAction: () => {
          this.edit = false
          this.$toast.open({
            message: 'Session is locked',
            queue: false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
footer.controls {
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #eee;
}
.session {
  header {
    margin-bottom: 1em;
  }
}
</style>
