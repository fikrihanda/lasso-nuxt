<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="6">
                <div class="text-h6 font-weight-medium">
                  Hak Akses Mobile
                </div>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn color="primary" :disabled="isEmptyUser">
                  <v-icon left>
                    mdi-check
                  </v-icon>
                  Simpan
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-mobile-user ref="hamUser" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="mb-3 mb-md-0">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-mobile-sbu-kp ref="hamSbuKp" :disabled="isEmptyUser" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pa-3">
            a
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref, useContext, watch } from '@nuxtjs/composition-api'
import HakAksesMobileUser from '~/components/setting/user/hak-akses-mobile/user'
import HakAksesMobileSbuKp from '~/components/setting/user/hak-akses-mobile/sbu-kp'

const { $axios } = useContext()

const hamUser = ref(null)
const hamSbuKp = ref(null)

const isEmptyUser = computed(() => {
  return _.isEmpty(hamUser.value?.form.user)
})

const getUserHAM = async () => {
  const { form: { user = {} } = {} } = hamUser.value
  hamSbuKp.value.form.selected = []
  if (_.isEmpty(user)) {
    hamUser.value.form.jumlahDevice = ''
    hamUser.value.form.status = null
    return
  }
  try {
    const { data = {} } = await $axios.$post('pengguna/backoffice/hak-akses/lihat', {
      cari: user.idPenggunaMobile,
      tipeRole: '1'
    })
    hamUser.value.form.jumlahDevice = data.jumlahDevice
    hamUser.value.form.status = data.statusAktif
    hamSbuKp.value.sbuKp.forEach((v) => {
      v.children.forEach((vc) => {
        const isExits = data.sbuKP.find(f => f.idKP === vc.id)
        if (isExits) { hamSbuKp.value.form.selected.push(vc) }
      })
    })
  } catch (err) {
    hamUser.value.form.jumlahDevice = ''
    hamUser.value.form.status = null
    hamSbuKp.value.form.selected = []
  }
}

watch(() => hamUser.value?.form.user, async () => {
  await getUserHAM()
})
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
