<template>
  <div>a</div>
</template>

<script setup>
import { useContext, useFetch } from '@nuxtjs/composition-api'

const { $api } = useContext()

// eslint-disable-next-line no-unused-vars
const { fetchState } = useFetch(async () => {
  try {
    await $api.pengguna.lihatLog()
  } catch (err) {
    console.log(err)
  }
})

</script>
