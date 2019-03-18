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
        <div class="column is-one-third" v-for="(session, i) in getSessions" :key="`session-${i}`" @click="openSess(session.id)">
          <div class="box">
            <article class="media">
              <div class="media-content">
                <header class="level is-mobile">
                  <div class="level-left">
                    <h2 class="is-size-4">
                      {{ session.created.seconds | moment("dddd") }}
                      <span class="is-size-7">
                        {{ session.created.seconds | moment("MM/DD/YY") }}
                      </span>
                    </h2>
                  </div>
                  <div class="level-right">
                    <button class="delete" @click="deleteSess(session.id)"></button>
                  </div>
                </header>
                <div class="content">
                  <ul>
                    <li v-for="(workout, j) in session.workout" :key="`exercise-${j}`">
                      <span class="name">
                        {{ workout.exercise }}
                      </span>
                      <b-taglist>
                        <b-tag type="is-white is-medium">
                          {{ workout.sets[0].weight }} <i class="has-text-grey">lbs</i>
                        </b-tag>
                        <b-tag type="is-white is-medium">
                          {{ workout.sets.length }} x {{ workout.sets[0].reps }} <i class="has-text-grey">reps</i>
                        </b-tag>
                      </b-taglist>
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
    
    li {
      list-style: none;
      line-height: 1.2;
      margin-bottom: 0.5em;
    }
    
    li + li {
      margin-top: 0.5em;
      padding-top: 0.5em;
      border-top: 1px solid #eee;
    }
    .name {
      position: relative;
    }
  }
}
</style>
