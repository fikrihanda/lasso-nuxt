<template>
  <div class="tabs">
    <v-btn color="primary" depressed tile height="48" @click="setMini">
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
import { computed } from '@nuxtjs/composition-api'

// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Number,
    default () {
      return null
    }
  },
  mini: {
    type: Boolean,
    default () {
      return false
    }
  }
})

// eslint-disable-next-line no-undef
const emits = defineEmits(['input', 'update:mini'])

const model = computed({
  get: () => props.value,
  set: val => emits('input', val)
})

const miniModel = computed({
  get: () => props.mini,
  set: val => emits('update:mini', val)
})

const setMini = () => {
  miniModel.value = !miniModel.value
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  position: sticky;

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
