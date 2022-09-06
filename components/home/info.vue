<template>
  <v-row>
    <v-col cols="12" sm="12" md="2">
      <v-avatar width="90" height="90">
        <img :src="photo" alt="photo">
      </v-avatar>
    </v-col>
    <v-col cols="12" sm="12" md="10">
      <v-row>
        <v-col cols="12">
          <div class="home-profile-name">
            {{ info.nama }}
          </div>
          <div class="home-profile-mitra">
            {{ info.namaMitra }}
          </div>
          <div class="home-profile-jenispengguna">
            <span>{{ jenisPengguna }}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="home-group-label">
              Email
            </div>
            <div class="home-group-text">
              {{ info.email }}
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="home-group-label">
              No. Telepon
            </div>
            <div class="home-group-text">
              {{ info.telepon }}
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="home-group-label">
              Regional
            </div>
            <div class="home-group-text">
              {{ info.namaSbu }}
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="home-group-label">
              Kantor Perwakilan
            </div>
            <div class="home-group-text">
              {{ info.namaKp }}
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <div class="home-group-label">
              Alamat
            </div>
            <div class="home-group-text">
              {{ info.alamat }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, useStore } from '@nuxtjs/composition-api'

const store = useStore()

const info = computed(() => {
  return store.getters['authorization/info']
})

const photo = computed(() => {
  const infoAuth = info.value
  if (_.isEmpty(infoAuth.photo)) {
    return require('@/assets/images/users/1.jpg')
  }
  return infoAuth.photo
})

const jenisPengguna = computed(() => {
  const infoAuth = info.value
  if (_.isEmpty(infoAuth.jenisPengguna)) {
    return '-'
  }
  return infoAuth.jenisPengguna
})
</script>

<style lang="scss">
.home-profile-name {
  font-size: 18px;
  color: #454a4b;
  font-weight: 600;
}
.home-profile-mitra {
  font-weight: 400;
  font-size: 14px;
  color: #788486;
}
.home-profile-jenispengguna {
  margin-bottom: 30px;

  span {
    font-weight: 600;
    font-size: 12px;
    display: inline-block;
    background: var(--v-primary-base);
    border-radius: 4px;
    padding: {
      left: 15px;
      right: 15px;
    }
    color: white;
  }
}
.home-group-label {
  font-weight: 400;
  color: #788486;
}
.home-group-text {
  font-weight: 600;
  color: #454a4b;
}
</style>
