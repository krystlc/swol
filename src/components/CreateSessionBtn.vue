<template>
  <button class="button is-primary" @click="createNewSession">
    <b-icon icon="plus"></b-icon>
    <slot></slot>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
import { sessionCollection } from '@/firebaseConfig'

export default {
  computed: {
    ...mapGetters(['getUserId'])
  },
  methods: {
    createNewSession() {
      const created = new Date()
      const session = {
        created,
        workout: [],
        uid: this.getUserId
      }
      sessionCollection.add(session)
        .then(result => {
          this.$router.push(`/s/${result.id}`)
        })
        .catch(err => {
          alert('someone has to fix this', err)
        })
    },
  }
}
</script>
