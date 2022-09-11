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
    >
      <slot />
    </v-tabs>
  </div>
</template>

<script setup>
import { computed, useContext } from '@nuxtjs/composition-api'

// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Number,
    default () {
      return null
    }
  }
})

// eslint-disable-next-line no-undef
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
  z-index: 6;

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
