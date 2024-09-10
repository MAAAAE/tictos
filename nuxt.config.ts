// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    runtimeConfig: {
        // The private keys which are only available server-side

        // Keys within public are also exposed client-side
        public: {
            apiBase: '/api',
            nodeUrl: '',
            faucetUrl: '',
            accountPrivateKey: ''
        },

    },

    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },

    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vesp/nuxt-fontawesome'],
    fontawesome: {
        icons: {
            solid: ['user', 'home', 'door-open', 'calendar-day', 'signature', 'money-bill', 'bars'],
            regular: ['comment'],
            brands: ['github'],
        },
    },
    imports: {
        dirs: ['./stores']
    },

})
