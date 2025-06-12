<script lang="ts" setup>
interface TipProps {
  icon?: string
  title?: string
  class?: string
}

defineSlots<{
  title?: (props: { mdcUnwrap?: string | boolean }) => any
  default?: (props: { mdcUnwrap?: string | boolean }) => any
}>()

const props = defineProps<TipProps>()

const slots = useSlots()
const { hasSlotContent } = useSlotUtils()

const tipIcon = computed(() => props.icon || 'i-heroicons-light-bulb')

const hasTitleSlotContent = computed(() => {
  if (slots.title) {
    const titleNodes = slots.title()
    return hasSlotContent(titleNodes)
  }
  return false
})

const tipTitle = computed(() => {
  if (hasTitleSlotContent.value) {
    return undefined
  }
  return props.title || 'Tip'
})

const tipColor = 'success'
</script>

<template>
  <UAlert
    :class="props.class"
    :color="tipColor"
    :icon="tipIcon"
    :title="tipTitle"
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
