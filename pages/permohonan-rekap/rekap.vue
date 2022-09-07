<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
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
      <v-row v-if="open.filter">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Regional" hide-details outlined dense height="36" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Kantor Perwakilan" hide-details outlined dense />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Kantor Perwakilan" hide-details outlined dense />
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn depressed color="primary" height="40">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                  <v-btn depressed color="primary" height="40">
                    <v-icon>mdi-file-excel</v-icon>
                  </v-btn>
                  <v-btn depressed color="primary" height="40">
                    <v-icon>mdi-table-cog</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>

<script setup>
import { computed, reactive } from '@nuxtjs/composition-api'

const open = reactive({
  filter: true,
  date: false
})

// eslint-disable-next-line no-unused-vars
const form = reactive({
  regional: '',
  office: '',
  dates: []
})

// eslint-disable-next-line no-unused-vars
const options = reactive({
  regional: [],
  office: []
})

// eslint-disable-next-line no-unused-vars
const dateRangeText = computed(() => {

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
