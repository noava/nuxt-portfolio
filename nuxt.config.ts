import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  future:{
    compatibilityVersion: 4
  },

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxtjs/supabase', '@pinia/nuxt', '@tresjs/nuxt'],

  fonts: {
    families: [
      { name: 'Saira', provider: 'google', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    ],
  },

  nitro: {
    preset: 'static',
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
})
