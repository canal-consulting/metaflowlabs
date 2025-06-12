<script setup lang="ts">
defineSlots<{
  default?: (props: Record<string, never>) => any
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <slot />
  </div>
</template>
