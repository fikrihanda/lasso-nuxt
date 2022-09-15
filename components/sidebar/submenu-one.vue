<template>
  <v-list dense nav>
    <template v-for="(mn, i) in menu.subMenu">
      <v-list-item
        v-if="!mn.subMenu.length"
        :key="i"
        :to="mn.path"
        link
        class="sidebar-list-item"
        active-class="sidebar-list-item-active"
      >
        <v-list-item-title>
          {{ mn.namaMenu }}
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
            <v-list-item-title>
              {{ mn.namaMenu }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <submenu :menu="mn" />
      </v-menu>
    </template>
  </v-list>
</template>

<script setup>
import Submenu from '~/components/sidebar/submenu-two'

defineProps({
  menu: {
    type: Object,
    default () {
      return {}
    }
  }
})
</script>
