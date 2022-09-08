<template>
  <v-row>
    <v-col cols="12">
      <rekap-table :column="column" :data="[]" />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api'
import RekapTable from '~/components/common/tables'

const column = computed(() => {
  return [
    {
      caption: 'Nama Agen',
      field: 'namaAgen',
      fixed: true
    },
    {
      caption: 'Regional',
      field: 'namaSbu',
      fixed: true
    },
    {
      caption: 'Office',
      field: 'namaKp'
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
      caption: 'Total',
      field: 'totalPermohonan'
    }
  ]
})
</script>
