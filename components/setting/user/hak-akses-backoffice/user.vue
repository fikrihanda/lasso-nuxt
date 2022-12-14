<template>
  <v-form ref="userForm" v-model="form.valid">
    <v-row align="center">
      <v-col cols="12" md="6" class="mb-3 mb-md-0">
        <div class="mb-2 font-weight-bold">
          Pilih User
        </div>
        <v-autocomplete
          v-model="form.user"
          :search-input.sync="search.user"
          :items="options.user"
          :loading="loading.user"
          :rules="rules.user"
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
      <v-col cols="6" md="3">
        <div class="mb-2 font-weight-bold">
          Jumlah Device
        </div>
        <v-text-field
          v-model="form.jumlahDevice"
          :disabled="isEmptyUser"
          :rules="rules.jumlahDevice"
          placeholder="Jumlah Device"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col cols="6" md="3">
        <div class="mb-2 font-weight-bold">
          Status Mobile
        </div>
        <div class="d-flex align-center" style="height: 40px">
          <v-radio-group
            v-model="form.status"
            dense
            :disabled="isEmptyUser"
            :rules="rules.jumlahDevice"
            hide-details
            class="mt-0"
            row
          >
            <v-radio label="Aktif" value="1" />
            <v-radio label="Tidak Aktif" value="0" />
          </v-radio-group>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { computed, reactive, ref, useContext } from '@nuxtjs/composition-api'
import { watchDebounced } from '@vueuse/core'

const { $axios } = useContext()

const userForm = ref(null)
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
  user: null,
  jumlahDevice: '',
  status: null
})

const isEmptyUser = computed(() => _.isEmpty(form.user))
const rules = computed(() => {
  return {
    user: [
      v => !_.isEmpty(v) || 'Required'
    ],
    jumlahDevice: [
      v => (!_.isNull(v) && !_.isUndefined(v) && v !== '') || 'Required'
    ],
    status: [
      v => (!_.isNull(v) && !_.isUndefined(v) && v !== '') || 'Required'
    ]
  }
})

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

const validate = () => {
  userForm.value.validate()
}

const reset = () => {
  userForm.value.reset()
}

watchDebounced(() => search.user, async () => {
  await searchUser()
}, { debounce: 1000 })

defineExpose({
  form,
  validate,
  reset
})
</script>
