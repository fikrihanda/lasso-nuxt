<template>
  <div class="d-flex justify-center">
    <div ref="targetElement" />
  </div>
</template>

<script setup>
import { ref, useContext, watchEffect } from '@nuxtjs/composition-api'
import useGoogleLogin from '~/composables/useGoogleLogin'

const { $config } = useContext()

const emits = defineEmits(['error', 'success'])

const targetElement = ref(null)
const { scriptLoaded } = useGoogleLogin()

watchEffect(() => {
  if (!scriptLoaded.value) { return }
  window.google?.accounts.id.initialize({
    client_id: $config.googleClientId,
    callback: (res) => {
      if (!res.clientId || !res.credential) {
        return emits('error')
      }
      emits('success', res)
    }
  })
  window.google?.accounts.id.renderButton(targetElement.value, { theme: 'outline', size: 'large' })
})
</script>
