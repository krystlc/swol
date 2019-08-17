<template>
  <default-layout>
    <section class="section" id="dashboard">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <div class="box is-paddingless">
              <dashboard-heatmap></dashboard-heatmap>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <h3 class="subtitle">Latest</h3>
              <div class="content is-small">
                <h5>{{ latestDate | date("dddd, MMMM Do YYYY") }}</h5>
                <ol type="1" v-if="latest">
                  <li v-for="(item, i) in latest.workout" :key="i">
                    <span class="exercise">{{ item.exercise }}</span>
                    <b-tag>{{ item | formatSet }}</b-tag>
                  </li>
                </ol>
              </div>
            </div>
            <div class="box">popular exercises</div>
          </div>
        </div>
      </div>
    </section>
    <new-session-btn></new-session-btn>
  </default-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFilter } from "vue-date-fns";

export default {
  filters: {
    date: dateFilter,
    formatSet(workout) {
      const sets = workout.sets.length;
      const reps = workout.sets[0].reps;
      return `${sets} x ${reps} reps`;
    }
  },
  components: {
    DefaultLayout: () => import("@/layouts/DefaultLayout"),
    NewSessionBtn: () => import("@/components/NewSessionBtn"),
    DashboardHeatmap: () => import("@/components/DashboardHeatmap")
  },
  computed: {
    ...mapGetters("sessionCollection", ["latest"]),
    latestDate() {
      return this.latest ? this.latest.created_at.toDate() : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  height: 1rem;
  font-style: italic;
  margin-left: 0.25rem;
}
</style>