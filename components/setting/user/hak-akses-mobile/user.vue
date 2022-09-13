<template>
  <v-form v-model="form.valid">
    <v-row align="center">
      <v-col cols="6">
        <v-autocomplete
          v-model="form.user"
          :search-input.sync="search.user"
          :items="options.user"
          :loading="loading.user"
          placeholder="Users"
          item-text="nama"
          single-line
          dense
          clearable
          outlined
          hide-details
          no-filter
          return-object
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          :disabled="isEmptyUser"
          placeholder="Jumlah Device"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="3">
        <v-radio-group
          v-model="form.status"
          label="Status Mobile"
          dense
          :disabled="isEmptyUser"
          hide-details
          class="mt-0"
          row
        >
          <v-radio label="Aktif" value="1" />
          <v-radio label="Tidak Aktif" value="0" />
        </v-radio-group>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { computed, reactive, useContext } from '@nuxtjs/composition-api'
import { watchDebounced } from '@vueuse/core'

const { $axios } = useContext()

const search = reactive({
  user: null
})

const options = reactive({
  user: []
})

const loading = reactive({
  user: false
})

const form = reactive({
  valid: false,
  user: {},
  status: null
})

const isEmptyUser = computed(() => _.isEmpty(form.user))

const searchUser = async () => {
  if (_.isEmpty(search.user)) { return }
  if (loading.user) { return }
  if (form.user?.nama === search.user) { return }
  loading.user = true
  try {
    const res = await $axios.$post('pengguna/backoffice/cari', {
      cari: search.user
    })
    options.user = res.data
  } catch (err) {}
  loading.user = false
}

watchDebounced(() => search.user, async () => {
  await searchUser()
}, { debounce: 1000 })
</script>
