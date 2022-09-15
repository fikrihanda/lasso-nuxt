<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="6">
                <div class="text-h6 font-weight-medium">
                  Hak Akses Backoffice
                </div>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn color="primary" :disabled="isRealDisabled">
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
      <v-col cols="12" md="6" lg="5" class="mb-3 mb-md-0">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-mobile-sbu-kp ref="hamSbuKp" :disabled="isEmptyUser" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="7">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-mobile-roles ref="hamRoles" :disabled="isEmptyUser" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref, useContext, watch } from '@nuxtjs/composition-api'
import HakAksesMobileUser from '~/components/setting/user/hak-akses-backoffice/user'
import HakAksesMobileSbuKp from '~/components/setting/user/hak-akses-backoffice/sbu-kp'
import HakAksesMobileRoles from '~/components/setting/user/hak-akses-backoffice/roles'

const { $axios } = useContext()

const hamUser = ref(null)
const hamSbuKp = ref(null)
const hamRoles = ref(null)

const isEmptyUser = computed(() => {
  return _.isEmpty(hamUser.value?.form.user)
})

const isRealDisabled = computed(() => {
  return isEmptyUser.value ||
    _.isEmpty(hamSbuKp.value?.form.selected) ||
    _.isEmpty(hamRoles.value?.form.role) ||
  _.isEmpty(hamRoles.value?.form.selected)
})

const getUserHAM = async () => {
  const { form: { user = {} } = {} } = hamUser.value
  hamSbuKp.value.form.selected = []
  hamRoles.value.isForm = 'current'
  hamRoles.value.form.role = null
  hamRoles.value.selected = []
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
      v?.children.forEach((vc) => {
        const isExits = data.sbuKP.find(f => f.idKP === vc.id)
        if (isExits) { hamSbuKp.value.form.selected.push(vc) }
      })
    })
    hamRoles.value.isForm = 'parent'
    hamRoles.value.options.role = [
      {
        idRole: data.idRole,
        namaRole: data.namaRole
      }
    ]
    hamRoles.value.form.role = {
      idRole: data.idRole,
      namaRole: data.namaRole
    }
    hamRoles.value.form.selected = buildReduce(data.menu)
  } catch (err) {
    hamUser.value.form.jumlahDevice = ''
    hamUser.value.form.status = null
    hamSbuKp.value.form.selected = []
    hamRoles.value.form.role = null
  }
}

const buildReduce = (val) => {
  return val.reduce((prev, cur) => {
    const children = _.isEmpty(cur?.subMenu)
      ? []
      : buildReduce(cur?.subMenu)
    const obj = {
      id: cur?.kodeMenu,
      name: cur?.namaMenu
    }
    if (!_.isEmpty(children)) { obj.children = children }
    prev.push(obj)
    return prev
  }, [])
}

watch(() => hamUser.value?.form.user, async () => {
  await getUserHAM()
})
</script>

<script>
export default {
  middleware: ['is-auth'],
  head: {
    title: 'Hak Akses Backoffice'
  }
}
</script>

<router>
{
  meta: {
    header: 'Hak Akses Backoffice',
    include: 'pages/setting/user/hak-akses-backoffice.vue'
  }
}
</router>
