<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Hello" outlined />
        <v-text-field label="Hello" outlined />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: [
    'is-auth',
    ({ redirect }) => {
      redirect('/home')
    }
  ]
}
</script>
