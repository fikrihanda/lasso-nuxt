<template>
  <v-row v-show="rowsLength > 1" class="pg-root">
    <v-col cols="12">
      <v-card>
        <v-card-text class="pa-3">
          <v-row align="center">
            <v-col cols="12" md="6">
              <v-pagination v-model="model" :length="rowsLength" :total-visible="7" color="primary" class="pg-nav" />
            </v-col>
            <v-col cols="6" md="3">
              <div class="d-flex align-center">
                <div class="text-subtitle-1 font-weight-bold mr-3">
                  Go To
                </div>
                <v-text-field
                  v-model="model"
                  outlined
                  dense
                  hide-details
                  append-icon="mdi-chevron-right"
                />
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="d-flex align-center">
                <div class="text-subtitle-1 font-weight-bold mr-3">
                  Shows
                </div>
                <v-select
                  v-model="limitModel"
                  hide-details
                  dense
                  outlined
                  :items="[20, 30, 50, 75, 100]"
                />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api'
// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Number,
    default () {
      return 1
    }
  },
  limit: {
    type: Number,
    default () {
      return 20
    }
  },
  totalRow: {
    type: Number,
    default () {
      return 0
    }
  }
})

// eslint-disable-next-line no-undef
const emits = defineEmits(['input', 'update:limit'])

const model = computed({
  get: () => props.value,
  set: (val) => {
    const parse = parseInt(val)
    if (parse === 0 || _.isNaN(parse)) {
      emits('input', 1)
    } else {
      emits('input', val)
    }
  }
})
const limitModel = computed({
  get: () => props.limit,
  set: val => emits('update:limit', val)
})
const rowsLength = computed(() => {
  return Math.ceil(props.totalRow / limitModel.value)
})
</script>

<style lang="scss">
.pg-root {
  position: sticky;
  bottom: 0;
  z-index: 5;
}
.pg-nav {
  .v-pagination {
    justify-content: start;
  }
}
</style>
