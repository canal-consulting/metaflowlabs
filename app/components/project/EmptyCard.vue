<script setup lang="ts">
defineSlots<{
  default?: (props: Record<string, never>) => any
}>()

withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'No projects match your criteria.'
})
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{ body: 'py-12 px-6' }"
  >
    <div class="flex flex-col items-center text-center">
      <UIcon
        name="i-lucide-folder-search"
        class="w-12 h-12 text-[var(--ui-text-muted)] mb-4"
        aria-hidden="true"
      />

      <p class="text-lg font-medium text-[var(--ui-text-highlighted)] mb-1">
        {{ label }}
      </p>

      <p class="text-sm text-[var(--ui-text-muted)] mb-6">
        Try adjusting your filters or view all projects.
      </p>

      <div class="flex items-center gap-3">
        <slot />
      </div>
    </div>
  </UCard>
</template>
