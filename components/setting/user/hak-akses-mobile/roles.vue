<template>
  <v-row>
    <v-col cols="5" class="mb-3">
      <div class="text-subtitle-1 font-weight-medium">
        Pilih Role dan Menu
      </div>
    </v-col>
    <v-col cols="7" class="mb-3 text-right">
      <v-btn depressed small color="primary" :disabled="treeViewDisabled" @click="selectAll">
        Select All
      </v-btn>
      <v-btn depressed small color="primary" :disabled="treeViewDisabled" @click="resetAll">
        Reset
      </v-btn>
    </v-col>
    <v-col cols="12" class="mb-3">
      <v-autocomplete
        v-model="form.role"
        :loading="loading.role"
        :items="options.role"
        :search-input.sync="search.role"
        item-text="namaRole"
        placeholder="Pilih Role"
        single-line
        dense
        clearable
        outlined
        hide-details
        no-filter
        return-object
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12">
      <v-treeview
        v-model="form.selected"
        :items="mobileMenus"
        selectable
        dense
        return-object
        transition
        selected-color="primary"
        expand-icon="mdi-chevron-down"
        :disabled="treeViewDisabled"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, reactive, ref, useContext, useStore, watch } from '@nuxtjs/composition-api'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  disabled: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const { $axios } = useContext()
const store = useStore()

const isForm = ref('current')

const search = reactive({
  role: ''
})
const options = reactive({
  role: []
})
const loading = reactive({
  role: false
})
const form = reactive({
  role: null,
  selected: []
})

const mobileMenus = computed(() => {
  const storeMobileMenus = store.getters['authorization/menusMobile']
  return buildReduce(storeMobileMenus)
})

const treeViewDisabled = computed(() => {
  return props.disabled || _.isEmpty(form.role)
})

const searchRole = async () => {
  if (_.isEmpty(search.role)) { return }
  if (loading.role) { return }
  if (form.role?.namaRole === search.role) { return }
  loading.role = true
  try {
    const res = await $axios.$post('pengguna/backoffice/role/cari', {
      cari: search.role,
      tipeRole: '2'
    })
    options.role = res.data
  } catch (err) {}
  loading.role = false
}

const selectRole = async () => {
  if (_.isEmpty(form.role)) {
    form.selected = []
    return
  }
  if (loading.role) { return }
  if (isForm.value === 'parent') { return }
  loading.role = true
  try {
    const res = await $axios.$post('pengguna/backoffice/role/cari/menu', {
      cari: form.role?.idRole,
      tipeRole: '2'
    })
    form.selected = buildReduce(res.data)
  } catch (err) {}
  loading.role = false
}

const buildReduce = (val) => {
  return val.reduce((prev, cur) => {
    const children = _.isEmpty(cur?.subMenu)
      ? []
      : buildReduce(cur?.subMenu)
    const obj = {
      id: cur?.kodeMenu,
      name: cur?.namaMenu
    }
    if (!_.isEmpty(children)) { obj.children = children }
    prev.push(obj)
    return prev
  }, [])
}

const selectAll = () => {
  form.selected = []
  form.selected = _.cloneDeep(mobileMenus.value)
}

const resetAll = () => {
  form.selected = []
}

watch(() => form.role, async () => {
  await selectRole()
})

watch(() => form.selected, () => {
  if (isForm.value === 'parent') {
    isForm.value = 'current'
  }
})

watchDebounced(() => search.role, async () => {
  await searchRole()
}, { debounce: 1000 })

defineExpose({
  form,
  options,
  isForm
})
</script>
