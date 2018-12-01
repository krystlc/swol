<template>
  <div class="settings-form">
    <form @submit.prevent="saveSettings" action="#" method="post">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Settings</p>
          <button class="button is-text" type="button" @click="isEditing = true" :disabled="isEditing">
            <b-icon icon="pencil"></b-icon>
          </button>
        </header>
        <section class="modal-card-body">
          <b-field label="Weight" horizontal>
            <b-input type="number" v-model.number="getSettings.weight" min="0" :disabled="!isEditing"></b-input>
          </b-field>
          <b-field label="Sets" horizontal>
            <b-input type="number" v-model.number="getSettings.sets" min="1" :disabled="!isEditing" required></b-input>
          </b-field>
          <b-field label="Reps" horizontal>
            <b-input type="number" v-model.number="getSettings.reps" min="1" :disabled="!isEditing" required></b-input>
          </b-field>
          <b-field label="Suggestions">
            <b-switch v-model="getSettings.suggestions" :disabled="!isEditing">
            </b-switch>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-primary" @click="$parent.close()" :disabled="!isEditing">Save</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userCollection } from '@/firebaseConfig'

export default {
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    ...mapGetters(['getSettings','getUserId'])
  },
  methods: {
    saveSettings() {
      const user = userCollection.doc(this.getUserId)
      user.get().then(doc => doc.exists ? user.update({settings: this.getSettings}) : user.set({settings: this.getSettings}))
    },
  }
}
</script>

<style scoped>
.field.nums .field {
  width: 90px;
}
</style>
