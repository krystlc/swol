<template>
  <div class="settings-form">
    <form @submit.prevent="save" action="#" method="post">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Settings</p> <button class="button" type="button" @click="isEditing = true">Edit</button>
        </header>
        <section class="modal-card-body">
          <b-field label="Weight" horizontal>
            <b-input type="number" v-model.number="userSettings.weight" min="0" :disabled="!isEditing"></b-input>
          </b-field>
          <b-field label="Sets" horizontal>
            <b-input type="number" v-model.number="userSettings.sets" min="1" :disabled="!isEditing" required></b-input>
          </b-field>
          <b-field label="Reps" horizontal>
            <b-input type="number" v-model.number="userSettings.reps" min="1" :disabled="!isEditing" required></b-input>
          </b-field>
          <b-field label="Suggestions">
            <b-switch v-model="userSettings.suggestions" :disabled="!isEditing">
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    ...mapState(['userSettings','currentUser'])
  },
  methods: {
    save() {
      if (this.currentUser) this.$store.dispatch('saveUserSettings')
      this.$toast.open({
        message: 'Settings saved!',
        type: 'is-success'
      })
    }
  }
}
</script>

<style scoped>
.field.nums .field {
  width: 90px;
}
</style>
