<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation'

const { headerLinks } = useNavigation()
const ui = computed(() => ({
  childLink: 'hover:bg-[color:var(--ui-bg-muted)]/50',
  childLinkLabel: 'main-gradient brightness-150',
  viewport: 'bg-muted ring ring-offset-6 ring-offset-[var(--ui-bg)] ring-[var(--ui-border)] border border-[var(--ui-border)]'
}))
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-[var(--ui-border)] bg-[color:var(--ui-bg)/0.75]"
  >
    <UContainer class="flex items-center justify-between gap-2 h-16">
      <div class="flex items-center gap-6">
        <NuxtLink
          aria-label="Homepage"
          class="navbar-logo flex items-center"
          to="/"
        >
          <div class="flex items-center">
            <div class="flex flex-col">
              <h1 class="font-bold text-xl text-[var(--ui-text-highlighted)]">
                Metaflowlabs
              </h1>
            </div>
            <img
              alt="Metaflowlabs Logo"
              class="block dark:hidden w-7 h-7"
              src="/logo.svg"
            >
            <img
              alt="Metaflowlabs Logo"
              class="hidden dark:block w-7 h-7"
              src="/logo.svg"
            >
          </div>
        </NuxtLink>
      </div>

      <nav class="hidden lg:flex flex-1 justify-center items-center gap-1.5">
        <UNavigationMenu
          :items="headerLinks"
          :ui="ui"
        />
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          icon="i-simple-icons-github"
          to="https://github.com/metaflowlabs"
          target="_blank"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
          :ui="{ leadingIcon: 'md:h-6 md:w-6' }"
        />
      </div>
    </UContainer>
  </header>
</template>
