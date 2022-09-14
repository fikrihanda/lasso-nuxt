<template>
  <v-row align="center">
    <v-col cols="6" class="mb-3">
      <div class="text-subtitle-1 font-weight-medium">
        Pilih SBU dan KP
      </div>
    </v-col>
    <v-col cols="6" class="mb-3 text-right">
      <v-btn depressed small color="primary" :disabled="disabled">
        Select All
      </v-btn>
      <v-btn depressed small color="primary" :disabled="disabled">
        Reset
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-treeview
        v-model="form.selected"
        :items="sbuKp"
        selectable
        dense
        return-object
        transition
        selected-color="primary"
        expand-icon="mdi-chevron-down"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, reactive, useStore } from '@nuxtjs/composition-api'

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  disabled: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const store = useStore()

const form = reactive({
  selected: []
})

const sbuKp = computed(() => {
  const storeSbuKp = store.getters['authorization/regionals']
  return storeSbuKp.reduce((prev, cur) => {
    const dataKp = _.isEmpty(cur.dataKp)
      ? []
      : cur.dataKp.reduce((prevKp, curKp) => {
        prevKp.push({
          id: curKp.idKp,
          name: curKp.namaKp
        })
        return prevKp
      }, [])
    prev.push({
      id: cur.idSbu,
      name: cur.namaSbu,
      children: dataKp
    })
    return prev
  }, [])
})

// eslint-disable-next-line no-undef
defineExpose({
  form,
  sbuKp
})
</script>
