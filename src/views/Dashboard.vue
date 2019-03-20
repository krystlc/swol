<template>
  <section class="section">
    <div class="container">
      <div class="level is-mobile">
        <div class="level-left">
          <h2 class="title">My Sessions</h2>
        </div>
        <div class="level-right">
          <router-link class="button is-primary" to="/s/new" tag="button">
            <b-icon icon="plus"></b-icon>
            <span>Create session</span>
          </router-link>
        </div>
      </div>
      <div class="columns is-multiline is-variable">
        <div class="column is-one-third" v-for="(session, i) in list" :key="`session-${i}`">
          <div class="box">
            <article class="media">
              <div class="media-content">
                <header class="level is-mobile">
                  <div class="level-left">
                    <h2 class="is-size-4">
                      <!-- {{ session.created.seconds | moment("dddd") }}
                      <span class="is-size-7">
                        {{ session.created.seconds | moment("MM/DD/YY") }}
                      </span> -->
                    </h2>
                  </div>
                  <div class="level-right">
                    <button class="delete" @click="deleteSession(session.id)"></button>
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
.box {
  height: 100%;
  
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
