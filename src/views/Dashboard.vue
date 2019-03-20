<template>
  <section class="section">
    <div class="container">
      <div class="dashboard">
        <header>
          <h1 class="subtitle">My sessions</h1>
        </header>
        <div class="session-list">
          <div class="box session is-clipped" v-for="(session, i) in list" :key="`session-${i}`">
            <div class="columns is-vcentered is-mobile is-gapless">
              <div class="column is-11">
                <div class="content">
                  <h6>
                    Monday
                  </h6>
                  <ul v-for="(workout, j) in session.workout" :key="`exercise-${j}`" class="is-marginless">
                    <li>
                      <span class="workout-name">
                        {{ workout.exercise }}
                      </span>
                      <b-taglist class="is-inline" attached>
                        <b-tag>
                          {{ workout.sets[0].weight }} <span class="is-italic">lbs</span>
                        </b-tag>
                        <b-tag>
                          {{ workout.sets.length }} x {{ workout.sets[0].reps }} <span class="is-italic">reps</span>
                        </b-tag>
                      </b-taglist>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column">
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
    ...mapGetters('sessionCollection', ['list'])
  },
  methods: {
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
.session {
  li {
    list-style: none;
    white-space: nowrap;
  }
}
</style>
