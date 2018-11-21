<template>
  <section class="section">
    <div class="container">
      <h2 class="subtitle">My Sessions</h2>
      <b-table :data="sessions" @click="selected" striped hoverable>
        <template slot-scope="props">
          <b-table-column field="created" label="Date" sortable>
            <h5 class="is-size-5">{{ props.row.created.seconds | moment("dddd") }}</h5>
            <span class="is-size-7 has-text-grey is-uppercase">{{ props.row.created.seconds | moment("MMMM Do YYYY, h:mm a") }}</span>
          </b-table-column>
          <b-table-column field="workout" label="Workout">
            <span v-for="(exercise, i) in props.row.workout" :key="i">{{ exercise }}</span>
          </b-table-column>
        </template>
        <template slot="footer">
          <div>
            <create-session-btn>
              <span>Create a new session</span>
            </create-session-btn>
          </div>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateSessionBtn from '@/components/CreateSessionBtn'

export default {
  components: { CreateSessionBtn },
  computed: {
    ...mapGetters({
      sessions: 'getUserSessions'
    })
  },
  methods: {
    selected(item) {
      this.$router.push(`/s/${item.id}`)
    }
  }
}
</script>
