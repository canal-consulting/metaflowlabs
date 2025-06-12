<script setup lang="ts">
defineSlots<{
  breadcrumbs?: (props: Record<string, never>) => any
  aside?: (props: Record<string, never>) => any
  main?: (props: Record<string, never>) => any
  default?: (props: Record<string, never>) => any
  right?: (props: Record<string, never>) => any
}>()
</script>

<template>
  <div>
    <div
      v-if="$slots.breadcrumbs"
      class="breadcrumb-container mb-6"
    >
      <slot name="breadcrumbs" />
    </div>
    <div class="lg:flex lg:gap-8">
      <div
        v-if="$slots.aside"
        class="lg:w-64 lg:shrink-0"
      >
        <slot name="aside" />
      </div>

      <div class="flex-1 min-w-0">
        <slot name="main" />
        <slot />
      </div>

      <div
        v-if="$slots.right"
        class="lg:w-56 lg:shrink-0"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
