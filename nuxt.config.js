const pkg = require('./package')

module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: ['@/assets/normalize.css'],

  styleResources: {
    scss: ['assets/variables.scss']
  },
  serverMiddleware: ['~/api/index.js'],

  plugins: [],

  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],

  axios: {
    baseURL: 'http://0.0.0.0:8080/api/'
  },

  server: {
    port: 8080
  },

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
