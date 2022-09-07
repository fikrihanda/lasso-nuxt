import colors from 'vuetify/lib/util/colors'
import webpack from 'webpack'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  router: {
    base: '/icrm/',
    middleware: ['set-token']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ICRM',
    title: 'ICRM',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/moment',
    '~/plugins/api',
    '~/plugins/vuex-persist',
    '~/plugins/vue-apexcharts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    '@nuxtjs/router-extras',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.CRM_API
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#2B534C',
          tableheader: '#EFEFEF',
          secondary: '#788486',
          black: '#454A4B',
          grey: colors.grey.base,
          info: '#1e88e5',
          success: '#21c1d6',
          accent: '#fc4b6c',
          default: '#563dea'
        },
        dark: {
          primary: '#0FACC9',
          tableheader: '#DDF6FB',
          secondary: '#788486',
          black: '#454A4B',
          grey: colors.grey.base,
          info: '#1e88e5',
          success: '#21c1d6',
          accent: '#fc4b6c',
          default: '#563dea'
        }
      },
      options: { customProperties: true }
    }
  },

  googleFonts: {
    download: false,
    families: {
      'Open Sans': {
        wght: [300, 400, 500, 600, 700, 800],
        ital: [300, 400, 500, 600, 700, 800]
      }
    }
  },

  publicRuntimeConfig: {
    googleClientId: process.env.GOOGLE_CLIENT_ID
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash-es',
        moment: 'moment'
      })
    ]
  }
}
