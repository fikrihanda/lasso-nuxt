<template>
  <v-row>
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
      />
    </v-col>
    <v-col cols="12">
      <v-treeview />
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive, useContext } from '@nuxtjs/composition-api'
import { watchDebounced } from '@vueuse/core'

const { $axios } = useContext()

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
  role: ''
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

watchDebounced(() => search.role, async () => {
  await searchRole()
}, { debounce: 1000 })
</script>
