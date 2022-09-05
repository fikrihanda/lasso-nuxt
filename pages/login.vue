<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align-content="center">
      <v-col cols="12" sm="9" md="7" lg="5" xl="3">
        <v-card>
          <v-progress-linear v-if="loading.btn" indeterminate />
          <v-card-text>
            <v-img :src="require('~/assets/images/logo/logo_name.svg')" width="156" class="mx-auto mb-6" />
            <h4 class="text--disabled font-weight-medium mb-9 text-center">
              Sign in to your account
            </h4>
            <v-form ref="formEl" v-model="form.valid">
              <v-text-field v-model="form.email" label="Email" :rules="rules.email" />
              <v-text-field
                v-model="form.password"
                label="Password"
                :type="show.password ? 'text' : 'password'"
                :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                class="mb-3"
                hint="At least 8 characters"
                counter
                @click:append="show.password = !show.password"
              />
              <v-btn block color="primary" class="mb-3" @click="onLogin">
                <v-icon left>
                  mdi-login
                </v-icon>
                Sign In
              </v-btn>
              <login-google @success="onLoginGoogle" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, useStore, onMounted, useRouter } from '@nuxtjs/composition-api'
import LoginGoogle from '~/components/login/google'

const store = useStore()
const router = useRouter()

const formEl = ref(null)
const form = reactive({
  valid: false,
  email: '',
  password: ''
})
const show = reactive({
  password: false
})
const loading = reactive({
  btn: false,
  backdrop: true,
  logo: false
})
const error = reactive({
  model: false,
  messages: ''
})

// eslint-disable-next-line no-unused-vars
const rules = computed(() => {
  return {
    email: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: [
      v => !!v || 'Password is required',
      v => v?.length >= 8 || 'Min 8 characters'
    ]
  }
})

const loadingImage = () => {
  setTimeout(() => {
    loading.logo = true
  }, 500)
  setTimeout(() => {
    loading.logo = false
    loading.backdrop = false
  }, 4000)
}

// eslint-disable-next-line no-unused-vars
const onLoginGoogle = async (res) => {
  loading.btn = true
  try {
    await store.dispatch('authorization/loginGoogle', res)
    router.push('/')
  } catch (err) {
    error.messages = err.messages
    error.model = true
  }
  loading.btn = false
}

const onLogin = async () => {
  formEl.value.validate()
  if (!form.valid) { return }
  loading.btn = true
  try {
    await store.dispatch('authorization/login', {
      email: form.email,
      password: form.password
    })
    router.push('/')
  } catch (err) {
    error.messages = err.messages
    error.model = true
  }
  loading.btn = false
}

onMounted(() => {
  loadingImage()
})
</script>

<script>
export default {
  layout: 'unauthorized',
  middleware: ['isnt-auth']
}
</script>
