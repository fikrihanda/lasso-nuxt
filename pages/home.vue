<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <div class="text-h6 font-weight-medium">
              Home
            </div>
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
        <v-row>
          <v-col cols="12">
            <home-last />
          </v-col>
          <v-col cols="12">
            <home-role-menu />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HomeInfo from '@/components/home/info'
import HomeActivity from '@/components/home/activity'
import HomeLast from '~/components/home/last'
import HomeRoleMenu from '~/components/home/role-menu'
</script>

<script>
export default {
  middleware: ['is-auth'],
  head: {
    title: 'Home'
  }
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
