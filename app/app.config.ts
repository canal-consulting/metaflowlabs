export default defineAppConfig({
  seo: {
    siteName: 'Metaflowlabs'
  },
  header: {
    logo: {
      alt: 'logo.svg',
      light: 'logo.svg',
      dark: 'logo.svg'
    }
  },
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error'
    },
    icons: {
      external: 'i-lucide-arrow-up-right'
    },
    button: {
      default: {
        size: 'md',
        variant: 'solid',
        color: 'primary'
      },
      slots: {
        base: 'font-semibold'
      }
    },
    alert: {
      default: {
        variant: 'subtle',
        color: 'info',
        icon: null
      },
      title: 'text-sm font-medium text-{color}-600 dark:text-{color}-400',
      description: 'text-sm text-neutral-600 dark:text-neutral-400 mt-2',
      icon: {
        base: 'flex-shrink-0 w-5 h-5 text-{color}-500 dark:text-{color}-400'
      }
    },
    tabs: {
      faqLanding: {
        base: 'w-full',
        list: {
          base: 'relative flex items-center justify-center gap-2 p-1',
          background: 'bg-transparent dark:bg-transparent',
          rounded: 'rounded-full',
          width: 'w-auto',
          tab: {
            base: 'relative inline-flex items-center justify-center flex-shrink-0 w-auto ui-focus-visible:focus:outline-none ui-focus-visible:focus:ring-2 ui-focus-visible:focus:ring-primary-500 dark:ui-focus-visible:focus:ring-primary-400 transition-colors duration-200 ease-out border-2 border-[var(--ui-border)] dark:border-[var(--ui-border-muted)]',
            active: 'text-[var(--ui-text-highlighted)] bg-[var(--ui-bg-elevated)] dark:text-[var(--ui-text-highlighted)] dark:bg-[var(--ui-bg-muted)]',
            inactive: 'text-[var(--ui-text-muted)] hover:bg-[var(--ui-bg-muted)] dark:hover:bg-[color:var(--ui-bg-elevated)/50]',
            padding: 'px-3 py-2',
            size: 'text-sm',
            font: 'font-medium',
            rounded: 'rounded-full'
          }
        }
      }
    },
    accordion: {
      faqLanding: {
        wrapper: 'w-full',
        item: {
          base: 'mb-2 group px-4 transform-gpu rounded-xl border border-[var(--ui-border)] dark:border-[var(--ui-border-muted)] bg-[var(--ui-bg-muted)] dark:bg-[color:var(--ui-bg-elevated)/50] transition duration-500 will-change-transform hover:bg-[var(--ui-bg-accented)] dark:hover:bg-[color:var(--ui-bg-inverted)/8]',
          size: 'text-sm',
          color: 'text-[var(--ui-text)] dark:text-[var(--ui-text-toned)]',
          padding: 'pt-0 pb-0'
        },
        button: {
          font: 'font-medium',
          size: 'text-sm',
          color: 'text-[var(--ui-text-highlighted)] dark:text-[var(--ui-text-highlighted)]',
          padding: 'py-4 px-0',
          icon: {
            base: 'text-[var(--ui-text-muted)] dark:text-[var(--ui-text-muted)]'
          }
        },
        content: {
          base: 'text-[var(--ui-text)] dark:text-[var(--ui-text-toned)] text-sm leading-relaxed',
          padding: 'px-0 pb-4 pt-0'
        },
        trailingIcon: {
          name: 'lucide:plus',
          base: 'transform transition-transform duration-200 ms-auto',
          active: 'rotate-135',
          inactive: 'rotate-0'
        }
      }
    }
  }
})
