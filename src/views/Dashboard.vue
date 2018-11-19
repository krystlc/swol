<template>
  <section class="section">
    <div class="container">
      <h2 class="subtitle">Past Sessions</h2>
      <b-table :data="data" :columns="columns"></b-table>
      <span v-if="!userSessions">Empty :(</span>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      data: [
        { 'id': 1, 'date': '2016-10-15 13:43:27' },
        { 'id': 1, 'date': '2016-10-15 13:43:27' }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'date',
          label: 'Label',
          centered: true
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentUser','userSessions'])
  }
}
</script>
