<script setup lang="ts">
import type { ResourceLink } from '~/types'

interface Props {
  title?: string
  links: ResourceLink[]
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<template>
  <div
    v-if="links?.length"
    class="space-y-3"
  >
    <h4
      v-if="title"
      class="text-xs font-bold uppercase tracking-wider text-[var(--ui-text-muted)]"
    >
      {{ title }}
    </h4>
    <ul class="space-y-2 list-none p-0 m-0">
      <li
        v-for="(link, index) in links"
        :key="index"
      >
        <ULink
          :to="link.to"
          :target="link.target"
          :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined"
          class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-primary)] transition-colors group inline-flex items-center gap-1.5"
          inactive-class=""
          active-class="text-[var(--ui-primary)] font-medium"
        >
          <UIcon
            v-if="link.icon"
            :name="link.icon"
            class="w-4 h-4 flex-shrink-0"
          />
          <span>{{ link.label }}</span>
          <UIcon
            v-if="link.target === '_blank'"
            name="i-heroicons-arrow-up-right-20-solid"
            class="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity"
          />
        </ULink>
      </li>
    </ul>
  </div>
</template>
