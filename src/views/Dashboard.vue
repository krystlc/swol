<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Sessions</h2>
      <b-table :data="getSessions" @click="selected" striped hoverable>
        <template slot-scope="props">
          <b-table-column field="created" label="Date" sortable>
            <h5 class="is-size-5">{{ props.row.created.seconds | moment("dddd") }}</h5>
            <span class="is-size-7 has-text-grey is-uppercase">{{ props.row.created.seconds | moment("MMMM Do YYYY, h:mm a") }}</span>
          </b-table-column>
          <b-table-column field="workout" label="Workout">
            <span v-for="(exercise, i) in props.row.workout" :key="i">{{ exercise }}</span>
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
          <div>
            <button class="button is-primary" @click="create">
              <b-icon icon="plus"></b-icon>
              <span>Create a new session</span>
            </button>
          </div>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateSession from '@/mixins/CreateSessionMixin'

export default {
  mixins: [CreateSession],
  computed: {
    ...mapGetters(['getSessions' ,'getUserId'])
  },
  methods: {
    selected(item) {
      this.$router.push(`/s/${item.id}`)
    },
  }
}
</script>
