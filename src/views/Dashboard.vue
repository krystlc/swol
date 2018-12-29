<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h2 class="title">My Sessions</h2>
        </div>
        <div class="level-right">
          <create-btn>
            <span>Create a new session</span>
          </create-btn>
        </div>
      </div>
      <b-table :data="getSessions" @click="selected" paginated striped hoverable per-page="7" default-sort="created.seconds" default-sort-direction="desc">
        <template slot-scope="props">
          <b-table-column field="created.seconds" label="Date" sortable width="240">
            <h5 class="is-size-5">{{ props.row.created.seconds | moment("dddd") }}</h5>
            <span class="is-size-7 has-text-grey is-uppercase">{{ props.row.created.seconds | moment("MMMM Do YYYY, h:mm a") }}</span>
          </b-table-column>
          <b-table-column field="workout" label="Workout">
            <div class="tags">
              <b-tag v-for="(exercise, i) in props.row.workout" :key="i">{{ exercise }}</b-tag>
            </div>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>Empty</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateBtn from '@/components/CreateSessionBtn'

export default {
  components: { CreateBtn },
  computed: {
    ...mapGetters(['getSessions','getUserId'])
  },
  methods: {
    selected(item) {
      this.$router.push(`/s/${item.id}`)
    },
  }
}
</script>
