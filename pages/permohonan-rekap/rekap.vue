<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="6">
                <div class="text-h6 font-weight-medium">
                  Rekap Permohonan
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
        <v-col cols="12">
          <v-card>
            <v-card-text class="pa-3">
              <per-rekap-pencarian />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-text class="pa-3">
              <per-rekap-table />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>

<script setup>
import { reactive } from '@nuxtjs/composition-api'
import PerRekapPencarian from '~/components/permohonan-rekap/rekap/pencarian'
import PerRekapTable from '~/components/permohonan-rekap/rekap/tables'

const open = reactive({
  filter: true
})
</script>

<script>
export default {
  head: {
    title: 'Permohonan Rekap'
  }
}
</script>

<router>
{
  meta: {
    header: 'Permohonan Rekap',
    include: 'pages/permohonan-rekap/rekap.vue'
  }
}
</router>
