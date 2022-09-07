<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-avatar color="accent lighten-4" min-width="30" width="30" height="30" class="mr-3">
              <v-icon color="accent lighten-2" small>
                mdi-logout
              </v-icon>
            </v-avatar>
            <div>
              <div class="text-caption">
                Last Login
              </div>
              <div class="font-weight-bold">
                {{ lastLogin }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-avatar color="success lighten-4" min-width="30" width="30" height="30" class="mr-3">
              <v-icon color="success lighten-2" small>
                mdi-account-multiple
              </v-icon>
            </v-avatar>
            <div>
              <div class="text-caption">
                User Role
              </div>
              <div class="font-weight-bold">
                {{ userRole }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, useStore } from '@nuxtjs/composition-api'

const store = useStore()

const info = computed(() => {
  return store.getters['authorization/info']
})

const lastLogin = computed(() => {
  const { tanggalLoginTerakhir = '' } = info.value
  return _.isEmpty(tanggalLoginTerakhir) ? '-' : moment(tanggalLoginTerakhir, 'YYYY-MM-DD HH:mm').fromNow()
})

const userRole = computed(() => {
  const { namaRole = '' } = info.value
  return _.isEmpty(namaRole) ? '-' : namaRole
})
</script>
