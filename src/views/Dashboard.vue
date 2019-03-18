<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h2 class="title">My Sessions</h2>
        </div>
        <div class="level-right">
          <button class="button is-primary" @click="createSess">
            <b-icon icon="plus"></b-icon>
            <span>Create session</span>
          </button>
        </div>
      </div>
      <div class="columns is-multiline is-1 is-variable">
        <div class="column is-one-quarter" v-for="(session, i) in getSessions" :key="`session-${i}`" @click="openSess(session.id)">
          <div class="box">
            <article class="media">
              <div class="media-content">
                <div class="is-pulled-right">
                  <button class="delete" @click="deleteSess(session.id)"></button>
                </div>
                <div class="content">
                  <p>
                    <strong>
                      {{ session.created.seconds | moment("dddd") }}
                    </strong>
                    <br>
                    <small>
                      <time :datetime="session.created.seconds">
                        {{ session.created.seconds | moment("MMMM Do YYYY, h:mm a") }}
                      </time>
                    </small>
                  </p>
                  <ul>
                    <li v-for="(workout, j) in session.workout" :key="`exercise-${j}`">
                      <span>
                        {{ workout.exercise }}
                      </span>
                      <span class="is-italic">
                        <strong>{{ workout.sets[0].weight }}</strong>lbs
                      </span>
                      <span class="is-size-7 has-text-grey-light">
                        {{ workout.sets.length }}x{{ workout.sets[0].reps }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('sessionsData', ['getSessions']),
    ...mapGetters('userData', ['docModeId'])
  },
  methods: {
    async createSess() {
      const newDoc = await this.$store.dispatch('sessionsData/set', {
        created: new Date(), 
        uid: this.docModeId,
        workout: []
      }).catch(err => alert('something went wrong creating a new session!', err)) // TODO: replace with toast
      if (newDoc) this.$router.push(`/s/${newDoc}`)
    },
    deleteSess(id) {
      this.$store.dispatch('sessionsData/delete', id)
    },
    openSess(id) {
      this.$router.push(`/s/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  &:hover {
    cursor: pointer;
  }
  ul {
    margin: 0;
  }
  ul li {
    list-style: none;
  }
  ul li + li {
    margin-top: 0.4em;
  }
}
</style>
