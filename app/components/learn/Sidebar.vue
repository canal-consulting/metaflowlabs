<script setup lang="ts">
import type { NavigationMenuItem } from '#ui/types'

const props = defineProps<{
  items: Readonly<NavigationMenuItem[]>
}>()

const navigationItems = computed(() => {
  return props.items
})
</script>

<template>
  <div class="p-4 sticky top-20">
    <UNavigationMenu
      v-if="navigationItems && navigationItems.length > 0"
      :items="navigationItems"
      :ui="{

      }"
      orientation="vertical"
    />
    <p
      v-else
      class="text-sm text-[var(--ui-text-muted)]"
    >
      No navigation items available.
    </p>
  </div>
</template>
