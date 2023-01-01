const title = 'Fitz Fish Art'
const description = 'A small fish in a big pond. 🐠🎨'

export default defineNuxtConfig({
  app: {
    head: {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'theme-color', content: '#9ADF9E' }
      ],
      link: [
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  typescript: { shim: false },
  experimental: { reactivityTransform: true }
})
