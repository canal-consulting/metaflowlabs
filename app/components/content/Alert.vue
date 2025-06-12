<script lang="ts" setup>
import { computed, useSlots } from 'vue'

interface AlertProps {
  type?: 'info' | 'warning' | 'critical' | 'success'
  icon?: string
  title?: string
  class?: string
}

defineSlots<{
  title?: (props: { mdcUnwrap?: string | boolean }) => any
  default?: (props: { mdcUnwrap?: string | boolean }) => any
}>()

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info'
})

const slots = useSlots()
const { hasSlotContent } = useSlotUtils()

const alertIcon = computed(() => {
  if (props.icon) {
    return props.icon
  }
  switch (props.type) {
    case 'warning':
      return 'i-heroicons-exclamation-triangle'
    case 'critical':
      return 'i-heroicons-exclamation-circle'
    case 'success':
      return 'i-heroicons-check-circle'
    case 'info':
    default:
      return 'i-heroicons-information-circle'
  }
})

const alertColor = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'warning'
    case 'critical':
      return 'error'
    case 'success':
      return 'success'
    case 'info':
    default:
      return 'info'
  }
})

const hasTitleSlotContent = computed(() => {
  if (slots.title) {
    const titleNodes = slots.title()
    return hasSlotContent(titleNodes)
  }
  return false
})

const alertTitle = computed(() => {
  if (hasTitleSlotContent.value) {
    return undefined
  }
  return props.title
})
</script>

<template>
  <UAlert
    :class="props.class"
    :color="alertColor"
    :icon="alertIcon"
    :title="alertTitle"
  >
    <template
      v-if="hasTitleSlotContent"
      #title
    >
      <slot
        mdc-unwrap="p"
        name="title"
      />
    </template>

    <template #description>
      <slot
        mdc-unwrap="p"
        name="default"
      />
    </template>
  </UAlert>
</template>
