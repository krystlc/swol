<template>
  <div class="settings-form">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Suggestions">
          <b-switch disabled>  
            <span>Coming soon</span>
          </b-switch>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-primary" @click="$parent.close()" disabled>Save</button>
        <button class="button" type="button" @click="$parent.close()">Close</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.field.nums .field {
  width: 90px;
}
</style>
