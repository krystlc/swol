<template>
  <section class="section">
    <div class="container">
      <div class="dashboard">
        <header>
          <h1 class="subtitle">My sessions</h1>
        </header>
        <div class="session-list" v-if="Object.entries(this.list).length > 0">
          <div class="box session is-clipped" v-for="(session, i) in list" :key="`session-${i}`">
            <div class="columns is-mobile is-gapless">
              <div class="column is-11" @click="openSession(session.id)">
                <div class="content">
                  <h6 v-if="getDate(session)">
                    {{ getDate(session) | moment('dddd') }}
                  </h6>
                  <ul v-for="(workout, j) in session.workout" :key="`exercise-${j}`" class="is-marginless">
                    <li>
                      <span class="workout-name">
                        {{ workout.exercise }}
                      </span>
                      <b-taglist class="is-inline" attached>
                        <b-tag>
                          {{ workout.sets[0].weight }} <span class="is-italic">lbs</span>
                          {{ workout.sets.length }} x {{ workout.sets[0].reps }} <span class="is-italic">reps</span>
                        </b-tag>
                        <b-tag type="is-info" v-if="workout.pr">
                          PR
                        </b-tag>
                      </b-taglist>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column has-text-right">
                <button class="delete" @click="deleteSession(session.id)"></button>
              </div>
            </div>
          </div>
        </div>
        <div class="empty hero-body has-background-light has-text-centered has-text-grey-light" v-else>
          <h6>Nothing to see here.</h6>
        </div>
      </div>
      <div class="fab">
        <b-tooltip
          label="Start a new session!"
          position="is-left"
          :active="fabActive"
          class="is-shadowless"
          animated
          always
        >
          <router-link class="button is-primary" to="/s/new" tag="button">
            <b-icon icon="plus" size="is-medium"></b-icon>
          </router-link>
        </b-tooltip>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fabActive: false
    }
  },
  computed: {
    ...mapGetters('sessionCollection', ['list']),
  },
  mounted() {
    if (Object.entries(this.list).length === 0) {
      this.fabActive = true
      const timeout = 3000
      setTimeout(() => {
        this.fabActive = false
      }, timeout);
    }
  },
  methods: {
    getDate(session) {
      if (session.hasOwnProperty('created_at')) {
        if (session.created_at.hasOwnProperty('seconds')) {
          return session.created_at.seconds
        } else {
          return Date.now()
        }
      } else if (session.hasOwnProperty('created')) {
        return session.created.seconds
      } else {
        return false
      }
    },
    deleteSession(id) {
      this.$dialog.confirm({
        message: 'Are you sure?',
        onConfirm: () => {
          this.$store.dispatch('sessionCollection/delete', id)
            .then(() => this.$toast.open('Session deleted'))
        }
      })
    },
    openSession(id) {
      this.$router.push(`/s/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.fab {
  position: fixed;
  bottom: 2em;
  right: 2em;
  
  .button {
    width: 4em;
    height: 4em;
    border-radius: 50%;
  }
}
header {
  margin-bottom: 1em;
}
.session.box {
  margin-bottom: 0.5em;

  li {
    list-style: none;
    white-space: nowrap;
  }
}
</style>
