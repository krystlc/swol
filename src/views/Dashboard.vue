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
                    <b-dropdown-item aria-role="listitem">Edit</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
              <div class="content">
                <b-field grouped group-multiline>
                  <div class="control" v-for="(workout, j) in session.workout" :key="j">
                    <b-taglist attached>
                      <b-tag type="is-dark">{{ workout || workout.name }}</b-tag>
                      <b-tag type="is-primary" v-if="workout.reps">{{ workout.reps }}</b-tag>
                    </b-taglist>
                  </div>
                </b-field>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-table
        :data="getSessions"
        @click="selected"
        paginated
        striped
        hoverable
        per-page="7"
        default-sort="created.seconds"
        default-sort-direction="desc"
      >
        <template slot-scope="props">
          <b-table-column field="created.seconds" label="Date" sortable width="240">
            <h5 class="is-size-5">{{ props.row.created.seconds | moment("dddd") }}</h5>
            <span
              class="is-size-7 has-text-grey is-uppercase"
            >{{ props.row.created.seconds | moment("MMMM Do YYYY, h:mm a") }}</span>
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
import { mapGetters } from "vuex";
import CreateBtn from "@/components/CreateSessionBtn";

export default {
  components: { CreateBtn },
  computed: {
    ...mapGetters(["getSessions", "getUserId"])
  },
  methods: {
    selected(item) {
      this.$router.push(`/s/${item.id}`);
    }
  }
};
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
