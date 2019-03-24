<template>
  <div class="workout-list">
    <div class="box" v-for="(workout, i) in payload" :key="`workout-${i}`">
      <div class="columns is-vcentered is-mobile is-gapless">
        <div class="column is-11">
          <h6>
            {{ workout.exercise }}
            <b-tag type="is-warning" v-if="workout.resistance">Resistance</b-tag>
          </h6>
          <b-taglist
            v-for="(set, j) in workout.sets"
            :key="`workout-${i}-set${j}`"
            class="is-marginless"
          >
            <b-tag type="is-white" class="has-text-grey-light">{{ ++j }}</b-tag>
            <b-tag type="is-white" class="is-medium">
              <template v-if="set.weight > 0">
                {{ set.weight }}
                <i class="has-text-grey">lbs</i>
              </template>
              <template v-else>Freeweight</template>
            </b-tag>
            <b-tag type="is-white" class="is-medium">
              {{ set.reps }}
              <i class="has-text-grey">reps</i>
            </b-tag>
          </b-taglist>
        </div>
        <div class="column">
          <button class="delete" @click="$emit('remove', i)" v-show="edit"></button>
        </div>
      </div>
    </div>
    <div
      class="hero-body has-text-centered has-background-light has-text-grey-light"
      v-if="!payload.length"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["payload", "edit"]
}
</script>

<style lang="scss" scoped>
.workout-list {
  .box {
    margin-bottom: 0.5em;
  }
  .tags .tag {
    height: 1em;
  }
}
</style>
