<template>
  <v-navigation-drawer
    v-model="model"
    app
    mini-variant-width="70"
    mobile-breakpoint="960"
    :mini-variant="mini"
  >
    <template #prepend>
      <div class="mb-3 pa-2 mt-3">
        <img v-if="!mini" :src="require('~/assets/images/logo/logo_name.svg')" width="140" alt="logo">
        <div v-else class="d-flex justify-center">
          <img :src="require('~/assets/images/logo/logo.png')" width="24" alt="logo">
        </div>
      </div>
    </template>
    <v-list dense nav>
      <template v-for="(menu, i) in menus">
        <v-list-item
          v-if="!menu.subMenu.length"
          :key="i"
          :to="menu.path"
          link
          class="sidebar-list-item"
          active-class="sidebar-list-item-active"
        >
          <v-list-item-icon>
            <v-icon>
              {{ getIcons(menu.path).icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ menu.namaMenu }}
          </v-list-item-title>
        </v-list-item>
        <v-menu v-else :key="i" offset-x bottom>
          <template #activator="{on, attrs}">
            <v-list-item
              link
              v-bind="attrs"
              class="sidebar-list-item"
              active-class="sidebar-list-item-active"
              v-on="on"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ getIcons(menu.path).icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ menu.namaMenu }}
              </v-list-item-title>
              <v-list-item-icon>
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <sidebar-submenu :menu="menu" />
        </v-menu>
      </template>
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn block color="primary" :width="mini ? 38 : '100%'" @click="onLogout">
          <v-icon :left="!mini">
            mdi-logout
          </v-icon>
          <span v-show="!mini">Logout</span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, useRouter, useStore } from '@nuxtjs/composition-api'
import SidebarSubmenu from '~/components/sidebar/submenu-one'

const store = useStore()
const router = useRouter()

// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Boolean,
    default () {
      return false
    }
  },
  mini: {
    type: Boolean,
    default () {
      return false
    }
  }
})

// eslint-disable-next-line no-undef
const emits = defineEmits(['input'])

const model = computed({
  get: () => {
    return props.value
  },
  set: val => emits('input', val)
})

const menus = computed(() => {
  return store.getters['authorization/menusBackoffice']
})

const icons = computed(() => {
  const iconsSvg = [
    ['dashboard', 'view-dashboard'],
    ['permohonan', 'routes'],
    ['project-activation', 'clipboard-check-multiple-outline'],
    ['report', 'poll'],
    ['setting', 'tune-vertical'],
    ['subs', 'access-point'],
    ['ticket', 'ticket-confirmation-outline'],
    ['billing', 'receipt-text-outline'],
    ['home', 'home-variant-outline'],
    ['customer-management', 'sitemap-outline'],
    ['collection', 'rhombus-split'],
    ['inventory', 'card-bulleted'],
    ['master', 'content-save-outline']
  ]
  return iconsSvg.map(icon => ({
    name: icon[0],
    icon: 'mdi-' + icon[1]
  }))
})

const getIcons = (iconName = '') => {
  if (_.isEmpty(iconName)) { return null }
  const find = icons.value.find(icon => icon.name === iconName.replace('/', ''))
  return find ?? null
}

const onLogout = () => {
  store.commit('authorization/setMenusMobile', [])
  store.commit('authorization/setRegionals', '')
  store.commit('authorization/setMenusBackoffice', [])
  store.commit('authorization/setInfo', [])
  store.commit('authorization/setToken', '')
  router.push('/login')
}

</script>

<style lang="scss">
.sidebar-list-item {
  &:hover, &:focus, &.sidebar-list-item-active {
    &.v-list-item--link {
      &:before {
        background-color: var(--v-primary-base);
        opacity: 1;
      }
    }
    &.v-list-item {
      :not(.v-list-item--active):not(.v-list-item--disabled) {
        z-index: 1;
        color: white;
      }
    }
  }
}
</style>
