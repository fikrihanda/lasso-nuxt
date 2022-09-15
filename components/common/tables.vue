<template>
  <dx-data-grid
    ref="dataGrid"
    width="100%"
    :data-source="data"
    :allow-column-reordering="true"
    :show-column-lines="true"
    :show-row-lines="true"
    :hover-state-enabled="true"
    :allow-column-resizing="true"
    :show-borders="true"
    :selection="{ mode: 'single' }"
  >
    <dx-paging :enabled="false" />
    <dx-selection
      v-if="checkList"
      mode="multiple"
      show-check-boxes-mode="always"
      :allow-select-all="false"
    />
    <dx-column-fixing :enabled="true" />
    <dx-scrolling
      :use-native="true"
      mode="standard"
    />
    <dx-column v-for="(v, i) in fixColumn" :key="i" v-bind="v" />
    <template v-for="(v, i) in cellTemplates" #[v]="ctx">
      <div :key="i">
        <slot :name="`temp-${v}`" v-bind="ctx">
          <div>
            {{ ctx.data.value }}
          </div>
        </slot>
      </div>
    </template>
  </dx-data-grid>
</template>

<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxColumnFixing,
  DxScrolling,
  DxSelection,
  DxPaging
} from 'devextreme-vue/data-grid'
import { computed, ref } from '@nuxtjs/composition-api'

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
        dataType: col?.type ?? '',
        dataField: col?.field ?? '',
        align: col?.align ?? '',
        width: col?.width ?? '',
        visible: col?.visible ?? true
      }
      re.cellTemplate = `cell(${re.dataField})`
      return re
    })
    : []
})

// eslint-disable-next-line no-unused-vars
const cellTemplates = computed(() => {
  const cols = _.cloneDeep(fixColumn.value)
  return _.uniq(cols.map(col => col.cellTemplate))
})

const showColumnChooser = () => {
  dataGrid.value.instance.showColumnChooser()
}

const hideColumnChooser = () => {
  dataGrid.value.instance.hideColumnChooser()
}

defineExpose({
  showColumnChooser,
  hideColumnChooser
})
</script>
