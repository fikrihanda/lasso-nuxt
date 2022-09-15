<template>
  <v-row align="center">
    <v-col cols="5" class="mb-3">
      <div class="text-subtitle-1 font-weight-medium">
        Pilih SBU dan KP
      </div>
    </v-col>
    <v-col cols="7" class="mb-3 text-right">
      <v-btn depressed small color="primary" :disabled="disabled" @click="selectAll">
        Select All
      </v-btn>
      <v-btn depressed small color="primary" :disabled="disabled" @click="resetAll">
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

defineProps({
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
  return buildReduce(storeSbuKp)
})

const buildReduce = (val, type = 'Sbu') => {
  const whoChild = type === 'Sbu' ? 'Kp' : ''
  return val.reduce((prev, cur) => {
    const children = _.isEmpty(cur?.[`data${whoChild}`])
      ? []
      : buildReduce(cur?.[`data${whoChild}`], 'Kp')
    const obj = {
      id: cur?.[`id${type}`],
      name: cur?.[`nama${type}`]
    }
    if (!_.isEmpty(children)) { obj.children = children }
    prev.push(obj)
    return prev
  }, [])
}

const selectAll = () => {
  form.selected = []
  form.selected = _.cloneDeep(sbuKp.value)
}

const resetAll = () => {
  form.selected = []
}

defineExpose({
  form,
  sbuKp
})
</script>
