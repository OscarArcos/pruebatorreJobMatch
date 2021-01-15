export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'server',
  server: {
    host: '0.0.0.0',
  },
  head: {
    title: 'torrePrueba',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/graphql', handler: '~/api/graphql.js' },
  ],

  env: {
    MONGO_URI:
      'mongodb+srv://torreUser:dNu332NjAJnleWyE@geocerca.hkxaj.mongodb.net/torrepruebadb?retryWrites=true&w=majority',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/api-torre.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '~/modules/mongodb-setup.js',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://torreprueba-pxyrt4ufoq-uc.a.run.app/graphql',
      },
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:4000/api',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
