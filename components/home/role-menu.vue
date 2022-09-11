<template>
  <v-expansion-panels v-model="panelOpen" multiple>
    <v-expansion-panel>
      <v-expansion-panel-header>Role</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-treeview :items="regToTree" transition dense />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Mobile Previlage</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-treeview :items="menuToTree" transition dense />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { computed, ref, useStore } from '@nuxtjs/composition-api'

const store = useStore()

const regionals = computed(() => {
  return store.getters['authorization/regionals']
})

const mobileMenus = computed(() => {
  return store.getters['authorization/menusMobile']
})

const regToTree = computed(() => {
  return mapRegional(regionals.value)
})

const menuToTree = computed(() => {
  return mapMenu(mobileMenus.value)
})

const mapRegional = (data = [], key = 'Sbu', child = 'dataKp') => {
  return data.map((d) => {
    const re = {
      id: d[`id${key}`],
      name: d[`nama${key}`]
    }
    if (_.isArray(d?.[child]) && d?.[child].length !== 0) {
      re.children = mapRegional(d[child], 'Kp')
    }
    return re
  })
}

const mapMenu = (data = []) => {
  return data.map((d) => {
    const re = {
      id: d.kodeMenu,
      name: d.namaMenu
    }
    if (d.subMenuExists === '1') {
      re.children = mapMenu(d.subMenu)
    }
    return re
  })
}

const panelOpen = ref([0, 1])
</script>
