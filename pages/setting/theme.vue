<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card>
          <v-card-text class="pa-3">
            <v-row align="center">
              <v-col cols="12">
                <div class="text-h6 font-weight-medium">
                  Theme
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text class="pa-3">
            <v-row class="theme-row">
              <v-col
                v-for="(v, i) in themes"
                :key="i"
                cols="12"
                sm="6"
                md="4"
                :class="[marginCalc(i)]"
              >
                <div
                  :class="['theme-content', whoSelected(v) && 'is-selected']"
                  :style="{backgroundImage: `url(${v.url})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
                  @click="clickCheckbox(v)"
                >
                  <v-checkbox
                    class="theme-checkbox"
                    :input-value="whoSelected(v)"
                    readonly
                    hide-details
                    dense
                  />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useContext, useStore } from '@nuxtjs/composition-api'
import useThemes from '~/composables/useThemes'

const themes = useThemes()
const store = useStore()
const { $vuetify } = useContext()

const whoSelected = (v) => {
  const getTheme = store.getters['themes/selected']
  return getTheme?.id === v.id
}

const clickCheckbox = (v) => {
  store.commit('themes/setSelected', v)
  const getTheme = store.getters['themes/selected']
  Object.keys(getTheme.light).forEach((key) => {
    $vuetify.theme.themes.light[key] = getTheme.light[key]
  })
  Object.keys(getTheme.dark).forEach((key) => {
    $vuetify.theme.themes.dark[key] = getTheme.dark[key]
  })
}

const marginCalc = (i) => {
  if ((i === 7 || i === '7') || (i === 6 || i === '6')) {
    return 'mb-3 mb-md-0'
  }
  if (i === 8 || i === '8') {
    return 'mb-0'
  }
}
</script>

<script>
export default {
  middleware: ['is-auth'],
  head: {
    title: 'Theme'
  }
}
</script>

<style lang="scss">
.theme-content {
  padding: 8px;
  height: 200px;
  cursor: pointer;
  transition: all .3s cubic-bezier(.25, .8, .5, 1);
  border-radius: 6px;

  &.is-selected {
    border: 2px solid var(--v-primary-base)
  }

  &:hover {
    scale: 1.05;
  }
}
.theme-checkbox {
  &.v-input--checkbox.v-input--dense {
    margin-top: 0;
  }

  &.v-input--selection-controls {
    padding-top: 0;
    .v-input__slot > .v-label,
    .v-radio > .v-label {
      display: flex;
      height: 200px;
    }
  }

  .v-input__slot {
    align-items: flex-start;
  }
  .v-label {
    position: relative;
  }
}

.theme-row {
  > :not([hidden])~:not([hidden]) {
    margin-bottom: 16px;
  }
}
</style>

<router>
{
  meta: {
    header: 'Theme',
    include: 'pages/setting/theme.vue'
  }
}
</router>
