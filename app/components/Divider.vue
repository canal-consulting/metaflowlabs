<script lang="ts" setup>
defineProps<{
  text?: string
}>()

const slot = defineSlots<{
  default: () => void
}>()
</script>

<template>
  <div class="linebreak relative inset-0 h-px w-full mx-auto">
    <div class="absolute flex w-full -translate-y-1/2 items-center justify-center text-[var(--ui-text-muted)]">
      <div class="bg-[var(--ui-bg)] px-4">
        <span v-if="text && !!slot.default">
          {{ text }}
        </span>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.linebreak {
  background-image: linear-gradient(95deg, transparent 10%, var(--ui-border) 50%, transparent 100%);
}
</style>
