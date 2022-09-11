<template>
  <v-form ref="refForm" v-model="search.valid">
    <v-row>
      <v-col cols="12" md="6" class="mb-3">
        <v-select
          v-model="search.regional"
          :items="options.regional"
          :loading="loading.regional"
          :rules="rules.regional"
          item-text="namaSbu"
          item-value="idSbu"
          label="Regional"
          hide-details
          outlined
          dense
          clearable
          @input="getOffice"
        />
      </v-col>
      <v-col cols="12" md="6" class="mb-3">
        <v-select
          v-model="search.office"
          :items="options.office"
          :loading="loading.office"
          :disabled="!search.regional"
          :rules="rules.office"
          item-text="namaKp"
          item-value="idKp"
          label="Kantor Perwakilan"
          hide-details
          outlined
          dense
          clearable
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          v-model="open.date"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{on, attrs}">
            <v-text-field
              :value="dateRangeText"
              v-bind="attrs"
              :rules="rules.dates"
              append-icon="mdi-calendar"
              label="Tanggal"
              clearable
              outlined
              dense
              readonly
              hide-details
              v-on="on"
              @click:append="open.date = true"
              @click:clear="search.dates = []"
            />
          </template>
          <v-date-picker
            v-model="search.dates"
            :max="today"
            scrollable
            range
            color="primary"
            @change="open.menu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn color="primary" height="40" @click="onSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn color="primary" height="40" @click="emits('export')">
          <v-icon>mdi-file-excel</v-icon>
        </v-btn>
        <v-btn color="primary" height="40" @click="emits('choose-col')">
          <v-icon>mdi-table-cog</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { computed, reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'

const today = moment().format('YYYY-MM-DD')

const { $axios } = useContext()
// eslint-disable-next-line no-undef
const emits = defineEmits(['search', 'export', 'choose-col'])

useFetch(async () => {
  await getRegional()
})

const refForm = ref(null)

const loading = reactive({
  regional: false,
  office: false
})

const open = reactive({
  date: false
})

const search = reactive({
  regional: '',
  office: '',
  dates: [today, today],
  valid: false
})

const options = reactive({
  regional: [],
  office: []
})

const dateRangeText = computed(() => {
  const dateOne = !_.isEmpty(search.dates?.[0]) ? search.dates[0] : ''
  const dateTwo = !_.isEmpty(search.dates?.[1]) ? search.dates[1] : ''
  if (dateOne === '' && dateTwo === '') { return '' }
  return `${dateOne} ~ ${dateTwo}`
})

const rules = computed(() => {
  return {
    regional: [
      v => !_.isEmpty(v) || 'Required'
    ],
    office: [
      v => !_.isEmpty(v) || 'Required'
    ],
    dates: [
      (v) => {
        const split = v?.split(' ~ ') ?? ['', '']
        const dateOne = Date.parse(split?.[0] ?? '')
        const dateTwo = Date.parse(split?.[1] ?? '')
        if (!_.isNaN(dateOne) && !_.isNaN(dateTwo)) {
          return dateOne < dateTwo || 'Required'
        } else {
          return 'Required'
        }
      }
    ]
  }
})

const getRegional = async () => {
  loading.regional = true
  try {
    const res = await $axios.$post('sbu/combo/box/lihat', {
      tipe: '1'
    })
    options.regional = res.data
  } catch (err) {
    options.regional = []
  }
  loading.regional = false
}

const getOffice = async () => {
  search.office = ''
  if (_.isEmpty(search.regional)) {
    options.office = []
    return
  }
  loading.office = true
  try {
    const res = await $axios.$post('sbu/kp/combo/box/lihat', {
      tipe: '1',
      idSbu: search.regional
    })
    options.office = res.data
    if (options.office.length === 1) {
      search.office = options.office?.[0].idKp ?? ''
    }
  } catch (err) {
    options.office = []
  }
  loading.office = false
}

const onSearch = () => {
  refForm.value.validate()
  if (!search.valid) { return }
  emits('search')
}

// eslint-disable-next-line no-undef
defineExpose({
  search
})
</script>
