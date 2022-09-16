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
                <v-btn
                  color="primary"
                  :loading="loading.save"
                  :disabled="isRealDisabled"
                  @click="onSave"
                >
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
            <hak-akses-backoffice-user ref="hamUser" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="5" class="mb-3 mb-md-0">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-backoffice-sbu-kp ref="hamSbuKp" :disabled="isEmptyUser" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="7">
        <v-card>
          <v-card-text class="pa-3">
            <hak-akses-backoffice-roles ref="hamRoles" :disabled="isEmptyUser" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, reactive, ref, useContext, watch } from '@nuxtjs/composition-api'
import HakAksesBackofficeUser from '~/components/setting/user/hak-akses-backoffice/user'
import HakAksesBackofficeSbuKp from '~/components/setting/user/hak-akses-backoffice/sbu-kp'
import HakAksesBackofficeRoles from '~/components/setting/user/hak-akses-backoffice/roles'

const { $axios } = useContext()

const hamUser = ref(null)
const hamSbuKp = ref(null)
const hamRoles = ref(null)
const loading = reactive({
  save: false
})

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
  hamSbuKp.value.form.old_selected = []
  hamRoles.value.isForm = 'current'
  hamRoles.value.form.role = null
  hamRoles.value.selected = []
  hamRoles.value.old_selected = []
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
    setHamUser(data)
    setHamSbuKp(data)
    setHamRole(data)
  } catch (err) {
    hamUser.value.form.jumlahDevice = ''
    hamUser.value.form.status = null
    hamRoles.value.form.role = null
  }
}

const setHamUser = (data) => {
  hamUser.value.form.jumlahDevice = data.jumlahDevice
  hamUser.value.form.status = data.statusAktif
}

const setHamSbuKp = (data) => {
  hamSbuKp.value.sbuKp.forEach((v) => {
    v?.children.forEach((vc) => {
      const isExits = data.sbuKP.find(f => f.idKP === vc.id)
      if (isExits) {
        hamSbuKp.value.form.selected.push({
          ...vc,
          sbu: v.id
        })
        hamSbuKp.value.form.old_selected.push({
          ...vc,
          sbu: v.id
        })
      }
    })
  })
}

const setHamRole = (data) => {
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
  buildReduce(data.menu).forEach((v) => {
    hamRoles.value.form.selected.push(v)
    hamRoles.value.form.old_selected.push(v)
  })
}

const onSave = async () => {
  hamUser.value.validate()
  hamSbuKp.value.validate()
  hamRoles.value.validate()
  if (!hamUser.value.form.valid || !hamSbuKp.value.form.valid || !hamRoles.value.form.valid) { return }
  loading.save = true
  const payload = {
    idPengguna: hamUser.value.form.user?.idPenggunaMobile,
    idRole: hamRoles.value.form.role?.idRole,
    jumlahDevice: hamUser.value.form.jumlahDevice,
    statusAktif: hamUser.value.form.status,
    listMenuBaru: hamRoles.value.selectedToPayload,
    listMenuLama: hamRoles.value.oldSelectedToPayload,
    listMenuUserLogin: hamRoles.value.backofficeMenusToPayload,
    listKpBaru: hamSbuKp.value.selectedToPayload,
    listKpLama: hamSbuKp.value.oldSelectedToPayload,
    listKpUserLogin: hamSbuKp.value.sbuKpToPayload,
    tipeRole: '1'
  }
  try {
    await $axios.$post('pengguna/backoffice/hak-akses/tambah', payload)
    hamUser.value.reset()
  } catch (err) {}
  loading.save = false
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
