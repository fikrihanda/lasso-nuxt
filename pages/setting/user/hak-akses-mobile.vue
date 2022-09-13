<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="12">
                <div class="text-h6 font-weight-medium">
                  Hak Akses Mobile
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-mobile-user />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HakAksesMobileUser from '~/components/setting/user/hak-akses-mobile/user'
</script>

<script>
export default {
  middleware: ['is-auth'],
  head: {
    title: 'Hak Akses Mobile'
  }
}
</script>

<router>
{
  meta: {
    header: 'Hak Akses Mobile',
    include: 'pages/setting/user/hak-akses-mobile.vue'
  }
}
</router>
