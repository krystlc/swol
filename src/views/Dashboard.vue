<template>
  <section class="section">
    <div class="container">
      <div class="dashboard">
        <header>
          <h1 class="subtitle">My sessions</h1>
        </header>
        <div class="session-list">
          <!-- add  @click="openSession(session.id)" somewhere -->
          <div class="box session is-clipped" v-for="(session, i) in list" :key="`session-${i}`">
            <div class="columns is-mobile is-gapless">
              <div class="column is-11">
                <div class="content">
                  <h6>
                    {{ date(session) | moment('dddd') }}
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
                <button class="delete"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fab">
        <router-link class="button is-primary" to="/s/new" tag="button">
          <b-icon icon="plus" size="is-large"></b-icon>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('sessionCollection', ['list']),
  },
  methods: {
    date(session) {
      if (session.hasOwnProperty('created')) {
        return session.created.seconds
      } else if (session.hasOwnProperty('created_at')) {
        return session.created_at
      } else {
        return 'i don\'t know'
      }
    },
    deleteSession(id) {
      this.$store.dispatch('sessionCollection/delete', id)
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
