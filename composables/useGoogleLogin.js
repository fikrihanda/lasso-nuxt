import { onMounted, onUnmounted, readonly, ref, watch } from '@nuxtjs/composition-api'

const loaded = ref(false)
const loading = ref(false)
const error = ref(false)
const subscriberCount = ref(0)

let scriptTag = null

const createScriptTag = () => {
  const scriptTag = document.createElement('script')
  scriptTag.src = 'https://accounts.google.com/gsi/client'
  scriptTag.async = true
  scriptTag.defer = true

  return scriptTag
}

const initialize = () => {
  loading.value = true
  scriptTag = createScriptTag()
  document.head.appendChild(scriptTag)

  scriptTag.onload = () => {
    loading.value = false
    loaded.value = true
  }

  scriptTag.onerror = () => {
    loading.value = false
    error.value = true
  }
}

watch(
  () => subscriberCount.value,
  (newCount, _oldCount) => {
    if (newCount > 0 && !loaded.value && !loading.value) {
      initialize()
    }
  }
)

export default function () {
  onMounted(() => {
    subscriberCount.value++
  })

  onUnmounted(() => {
    subscriberCount.value--
  })

  return {
    scriptLoaded: readonly(loaded),
    scriptLoadError: readonly(error)
  }
}
