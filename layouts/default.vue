<template>
  <v-app>
    <common-sidebar v-model="mini" />
    <v-main class="app-background">
      <common-tab v-model="tab" :mini.sync="mini">
        <v-tab v-for="(v, i) in tabs" :key="i" @click="router.push(v.path)">
          <div class="d-flex align-center">
            <span :class="[tabs.length >= 2 && 'mr-3']">{{ v.header }}</span>
            <a v-if="tabs.length >= 2" href="#" class="text-decoration-none" @click.prevent="removeSelect(v)">
              <v-icon>mdi-close</v-icon>
            </a>
          </div>
        </v-tab>
      </common-tab>
      <nuxt keep-alive :keep-alive-props="{include: isAlive}" />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onMounted, ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import CommonSidebar from '@/components/common/sidebar'
import CommonTab from '@/components/common/tabs'

const route = useRoute()
const router = useRouter()

const tab = ref(null)
const tabs = ref([])
const mini = ref(false)

const curretTab = computed(() => {
  return route.value
})

const isAlive = computed(() => {
  return tabs.value.map(tab => tab.include)
})

const onMountedTab = () => {
  if (_.isEmpty(curretTab.value.meta)) { return }
  tabs.value.push({
    ...curretTab.value.meta,
    path: curretTab.value.path
  })
  tab.value = 0
}

const addMetaOrSelect = () => {
  const idx = tabs.value.findIndex(tab => tab.header === curretTab.value.meta.header)
  if (idx === -1) {
    tabs.value.push({
      ...curretTab.value.meta,
      path: curretTab.value.path
    })
    tab.value = tabs.value.length - 1
  } else {
    tab.value = idx
  }
}

const removeSelect = (tab) => {
  const idx = tabs.value.findIndex(tb => tb.header === tab.header)
  if (idx === -1) { return }
  tabs.value.splice(idx, 1)
  const lastTabIndex = tabs.value.length - 1
  tab.value = lastTabIndex
  if (tabs.value[lastTabIndex].path !== curretTab.value.path) {
    router.push(tabs.value[lastTabIndex].path)
  }
}

watch(() => curretTab.value, () => {
  addMetaOrSelect()
})

onMounted(() => {
  onMountedTab()
})
</script>

<script>
export default {
  name: 'Default'
}
</script>

<style lang="scss">
.app-background {
  background-color: var(--v-grey-lighten3);
}
</style>
