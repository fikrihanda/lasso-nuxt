<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="6">
                <div class="text-h6 font-weight-medium">
                  Rekap Permohonan Per Tanggal
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-right">
                  <v-btn small color="primary" @click="open.filter = !open.filter">
                    <v-icon left>
                      mdi-filter
                    </v-icon>
                    Filter
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-row v-show="open.filter">
        <v-col cols="12" class="mb-3">
          <v-card>
            <v-card-text class="pa-3">
              <per-tanggal-pencarian
                ref="refPerTanggalPencarian"
                @choose-col="chooseCol"
                @search="onSearch"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <tables
              ref="refTables"
              :column="column"
              :data="lists"
            />
          </v-card-text>
          <v-overlay v-model="loading.table" absolute>
            <v-progress-circular
              indeterminate
              color="white"
              size="50"
            />
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
    <paginations v-model="pagination.page" :limit.sync="pagination.limit" :total-row="pagination.totalRow" />
  </v-container>
</template>

<script setup>
import { computed, reactive, ref, useContext, watch } from '@nuxtjs/composition-api'
import PerTanggalPencarian from '~/components/permohonan-rekap/tanggal/pencarian'
import Tables from '~/components/common/tables'
import Paginations from '~/components/common/pagination'

const { $axios } = useContext()
const refTables = ref(null)
const refPerTanggalPencarian = ref(null)
const lists = ref([])
const pagination = reactive({
  limit: 20,
  page: 1,
  totalRow: 0
})
const open = reactive({
  filter: true
})
const loading = reactive({
  table: false
})

const column = computed(() => {
  return [
    {
      caption: 'Tanggal',
      field: 'tanggal',
      fixed: true
    },
    {
      caption: 'Hari',
      field: 'hari',
      fixed: true
    },
    {
      caption: 'Negotiation',
      field: 'negotiation'
    },
    {
      caption: 'Approve Deal',
      field: 'approveDeal'
    },
    {
      caption: 'Close Won',
      field: 'closeWon'
    },
    {
      caption: 'Close Lost',
      field: 'closeLost'
    },
    {
      caption: 'Home Connected',
      field: 'hc'
    }
  ]
})

const chooseCol = () => {
  refTables.value.showColumnChooser()
}

const getAll = async () => {
  const search = refPerTanggalPencarian.value.search
  loading.table = true
  try {
    const res = await $axios.$post('permohonan/rekap/pertanggal', {
      idKp: search.office,
      idSbu: search.regional,
      idMobilePengguna: search.agent,
      idLayanan: search.layanan,
      idProduk: search.produk,
      limit: pagination.limit,
      pageIn: pagination.page,
      tanggalMulai: search.dates[0],
      tanggalSelesai: search.dates[1]
    })
    lists.value = res.data.data
    pagination.totalRow = res.data.totalRow
  } catch (err) {
    lists.value = []
    pagination.totalRow = 0
  }
  loading.table = false
  open.filter = false
}

const onSearch = async () => {
  if (pagination.page === 1) {
    await getAll()
  } else {
    pagination.page = 1
  }
}

watch(() => pagination.page, async () => {
  await getAll()
})
watch(() => pagination.limit, async () => {
  await onSearch()
})
</script>

<script>
export default {
  middleware: ['is-auth'],
  head: {
    title: 'Rekap Permohonan Per Tanggal'
  }
}
</script>

<router>
{
  meta: {
    header: 'Rekap Permohonan Per Tanggal',
    include: 'pages/permohonan-rekap/tanggal.vue'
  }
}
</router>
