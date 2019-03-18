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
        <div class="column is-one-quarter" v-for="(session, i) in getSessions" :key="i">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ session.created.seconds | moment("dddd") }}</p>
                  <p class="subtitle is-6">
                    <time
                      :datetime="session.created.seconds"
                    >{{ session.created.seconds | moment("MMMM Do YYYY, h:mm a") }}</time>
                  </p>
                </div>
                <div class="media-right">
                  <b-dropdown hoverable position="is-bottom-left" aria-role="list">
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="dots-horizontal"></b-icon>
                    </button>
                    <b-dropdown-item aria-role="listitem">Share</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem" has-link>
                      <a :href="`/s/${session.id}`">Edit</a>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem" @click="deleteSess(session.id)">Delete</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
              <div class="content">
                <b-field grouped group-multiline>
                  <div class="control" v-for="(workout, j) in session.workout" :key="j">
                    <b-taglist attached>
                      <b-tag type="is-dark">{{ workout.exercise }}</b-tag>
                      <b-tag type="is-primary" v-if="workout.sets">{{ workout.sets.length }} x {{ workout.sets[0].reps }}</b-tag>
                    </b-taglist>
                  </div>
                </b-field>
              </div>
            </div>
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
        uid: this.docModeId
      })
      if (newDoc) {
        this.$router.push(`/s/${newDoc}`)
      } else {
        // TODO: replace with toast
        alert('something went wrong')
      }
    },
    deleteSess(id) {
      this.$store.dispatch('sessionsData/delete', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-footer {
    margin-top: auto;
  }
}
</style>
