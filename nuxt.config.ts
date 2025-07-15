import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  future:{
    compatibilityVersion: 4
  },

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxtjs/supabase', '@pinia/nuxt', '@tresjs/nuxt', 'nuxt-umami'],

  fonts: {
    families: [
      { name: 'Saira', provider: 'google', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    ],
  },

  nitro: {
    preset: 'static',
    prerender: {
      ignore: ['/art-gen', '/'],
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  supabase: {
    redirect: false,
    types: false,
  },

  umami: {
    id: `${process.env.UMAMI_WEBSITE_ID}`,
    host: `${process.env.UMAMI_HOST}`,
    autoTrack: true,
    enabled: process.env.UMAMI_IGNORE != 'true',
  },
})