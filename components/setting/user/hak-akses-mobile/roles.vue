<template>
  <v-row>
    <v-col cols="12">
      <v-autocomplete
        v-model="form.role"
        :loading="loading.role"
        :items="options.role"
        :search-input.sync="search.role"
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
  </v-row>
</template>

<script setup>
import { reactive } from '@nuxtjs/composition-api'

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
</script>
