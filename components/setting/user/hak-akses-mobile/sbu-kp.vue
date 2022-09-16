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
  valid: false,
  selected: [],
  old_selected: []
})

const sbuKp = computed(() => {
  const storeSbuKp = store.getters['authorization/regionals']
  return buildReduce(storeSbuKp)
})

const sbuKpToPayload = computed(() => {
  return sbuKp.value.reduce((prev, cur) => {
    cur?.children.forEach(c => prev.push(`${c?.sbu}##${c?.id}`))
    return prev
  }, []).join('@@')
})

const selectedToPayload = computed(() => {
  return form.selected?.reduce((prev, cur) => {
    prev.push(`${cur?.sbu}##${cur?.id}`)
    return prev
  }, []).join('@@')
})

const oldSelectedToPayload = computed(() => {
  return form.old_selected?.reduce((prev, cur) => {
    prev.push(`${cur?.sbu}##${cur?.id}`)
    return prev
  }, []).join('@@')
})

const buildReduce = (val, type = 'Sbu', cr = null) => {
  const whoChild = type === 'Sbu' ? 'Kp' : ''
  return val.reduce((prev, cur) => {
    const children = _.isEmpty(cur?.[`data${whoChild}`])
      ? []
      : buildReduce(cur?.[`data${whoChild}`], whoChild, cur)
    const obj = {
      id: cur?.[`id${type}`],
      name: cur?.[`nama${type}`]
    }
    if (!_.isEmpty(children)) { obj.children = children }
    if (cr !== null) { obj.sbu = cr?.idSbu }
    prev.push(obj)
    return prev
  }, [])
}

const validate = () => {
  form.valid = !_.isEmpty(form.selected)
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
  sbuKp,
  selectedToPayload,
  oldSelectedToPayload,
  sbuKpToPayload,
  validate
})
</script>
