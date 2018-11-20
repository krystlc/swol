<template>
  <section class="section">
    <div class="container">
      <h2 class="subtitle has-text-centered">My Sessions</h2>
      <b-table :data="userSessions" :columns="columns" v-if="hasSessions"/>
      <div class="has-text-centered" v-else>
        <router-link to="/new" class="button is-outlined is-danger is-rounded">
          <b-icon icon="plus"></b-icon>
          <span>Create a new session</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      columns: [
        {
          field: 'id',
          label: 'ID',
        },
        {
          field: 'created',
          label: 'Date',
        }
      ]
    }
  },
  computed: {
    ...mapState(['userSessions']),
    hasSessions() {
      if(this.userSessions) {
        return this.userSessions.length > 0 ? true : false
      }
    }
  }
}
</script>
