<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center">
        <v-col cols="8">
          <div class="d-flex align-center">
            <v-avatar color="deep-purple lighten-4" min-width="30" width="30" height="30" class="mr-3">
              <v-icon color="deep-purple lighten-2" small>
                mdi-lightning-bolt-outline
              </v-icon>
            </v-avatar>
            <div class="text-subtitle-1 font-weight-bold">
              Last Activity
            </div>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="text-right font-weight-bold">
            {{ dateNow }}
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <apex-chart type="bar" :options="chartOptions" :series="series" height="350" />
    </v-col>
    <v-overlay :value="fetchState.pending" absolute>
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-row>
</template>

<script setup>
import { computed, reactive, ref, useContext, useFetch } from '@nuxtjs/composition-api'

const { $api } = useContext()

const series = ref([
  {
    name: 'Backoffice',
    data: []
  },
  {
    name: 'Mobile',
    data: []
  }
])

const chartOptions = reactive({
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '80%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: []
  }
})

const dateNow = computed(() => {
  return moment().format('MMM YYYY')
})

// eslint-disable-next-line no-unused-vars
const { fetchState } = useFetch(async () => {
  try {
    const res = await $api.pengguna.lihatLog()
    const { data } = res
    chartOptions.xaxis.categories.push(...data.map(dt => dt.tanggal))
    series.value.splice(0, 1, {
      ...series.value[0],
      data: data.map(dt => Number(dt.jumlahBackoffice))
    })
    series.value.splice(1, 1, {
      ...series.value[1],
      data: data.map(dt => Number(dt.jumlahMobile))
    })
  } catch (err) {
    console.log(err)
  }
})

</script>
