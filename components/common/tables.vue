<template>
  <dx-data-grid
    ref="dataGrid"
    width="100%"
    :data-source="data"
    key-expr="date"
    :allow-column-reordering="true"
    :show-column-lines="true"
    :show-row-lines="true"
    :hover-state-enabled="true"
    :allow-column-resizing="true"
    :show-borders="true"
    :selection="{ mode: 'single' }"
  >
    <dx-selection
      v-if="checkList"
      mode="multiple"
      show-check-boxes-mode="always"
      :allow-select-all="false"
    />
    <dx-column-chooser :enabled="false" />
    <dx-column-fixing :enabled="true" />
    <dx-scrolling
      :use-native="true"
      mode="standard"
    />
    <dx-paging :page-size="100" />
    <dx-column v-for="(v, i) in fixColumn" :key="i" v-bind="v">
      <template #[v.cellTemplate]="ctx">
        <slot :name="v.cellTemplate" v-on="ctx" />
      </template>
    </dx-column>
  </dx-data-grid>
</template>

<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxScrolling,
  DxPaging,
  DxSelection
} from 'devextreme-vue/data-grid'
import { computed, ref } from '@nuxtjs/composition-api'

// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Array,
    default () {
      return []
    }
  },
  textData: {
    type: String,
    default () {
      return ''
    }
  },
  column: {
    type: Array,
    default () {
      return []
    }
  },
  checkList: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const dataGrid = ref(null)

const fixColumn = computed(() => {
  return props.column.length
    ? props.column.map((col) => {
      const re = {
        fixed: col?.fixed ?? false,
        caption: col?.caption ?? '',
        type: col?.type ?? '',
        field: col?.field ?? '',
        align: col?.align ?? '',
        width: col?.width ?? '',
        visible: col?.visible ?? true
      }
      re.cellTemplate = `cell${re.field}`
      return re
    })
    : []
})
</script>

<style src="~/assets/styles/table.scss" lang="scss"/>
