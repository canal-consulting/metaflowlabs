export default defineNuxtConfig({

  modules: [
    '@nuxtjs/seo',
    'nuxt-content-twoslash',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-mcp',
    'nuxt-llms'
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Metaflowlabs',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ]
    },
    pageTransition: false,
    layoutTransition: false
  },
  css: ['/assets/css/main.css'],
  router: { options: { scrollBehaviorType: 'smooth' } },
  site: {
    url: 'https://metaflowlabs.nuxt.space',
    name: 'Metaflowlabs',
    description: 'Metaflowlabs is an all-in-one development hub for Metaflow, providing in-depth guides, tutorials and reusable patterns for working with Metaflow.',
    defaultLocale: 'en'
  },
  colorMode: { preference: 'system' },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'material-theme-lighter',
            dark: 'material-theme-palenight'
          },
          langs: ['python']
        }
      }
    }
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error']
    }
  },
  routeRules: {
    '/': { prerender: true }
  },
  future: { compatibilityVersion: 4 },
  experimental: {
    viewTransition: true
  },
  compatibilityDate: '2025-01-05',
  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:chevron-right'
      ]

    }
  },
  llms: {
    domain: 'https://metaflowlabs.nuxt.space',
    title: 'Metaflowlabs',
    description: 'Metaflowlabs is an all-in-one development hub for Metaflow, providing in-depth guides, tutorials and reusable patterns for working with Metaflow.',
    full: {
      title: 'The full Metaflowlabs Landing-Page documentation, blog content for llms',
      description: 'The complete Metaflowlabs documentation and blog posts written in Markdown (MDC syntax).'
    }
  }
})
