<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <h2 class="font-weight-medium">
              Home
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <home-info />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <home-activity />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        a
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HomeInfo from '@/components/home/info'
import HomeActivity from '@/components/home/activity'
</script>

<script>
export default {
  middleware: ['is-auth']
}
</script>

<router>
{
  meta: {
    header: 'Home',
    include: 'pages/home.vue'
  }
}
</router>
