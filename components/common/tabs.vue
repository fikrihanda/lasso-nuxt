<template>
  <div class="tabs">
    <v-btn color="primary" depressed tile height="48" @click="toggleClick">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-tabs
      v-model="model"
      background-color="primary"
      center-active
      dark
      show-arrows
    >
      <slot />
    </v-tabs>
  </div>
</template>

<script setup>
import { computed, useContext } from '@nuxtjs/composition-api'

const props = defineProps({
  value: {
    type: Number,
    default () {
      return null
    }
  }
})

const emits = defineEmits(['input', 'toggle'])

const { $vuetify } = useContext()

const model = computed({
  get: () => props.value,
  set: val => emits('input', val)
})

const toggleClick = () => {
  emits('toggle', $vuetify.breakpoint.smAndDown ? 'drawer' : 'mini')
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 5;

  .v-tabs {
    width:  calc(100% - 78px);

    .v-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .v-tab--active .v-icon,
    .v-tab--active .v-btn.v-btn--flat {
      color: white;
    }
  }
}

</style>
