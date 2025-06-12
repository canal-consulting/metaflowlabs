<script lang="ts" setup>
interface NoteProps {
  icon?: string
  title?: string
  class?: string
}

defineSlots<{
  title?: (props: { mdcUnwrap?: string | boolean }) => any
  default?: (props: { mdcUnwrap?: string | boolean }) => any
}>()

const props = defineProps<NoteProps>()

const slots = useSlots()
const { hasSlotContent } = useSlotUtils()

const noteIcon = computed(() => props.icon || 'i-heroicons-pencil-square')

const hasTitleSlotContent = computed(() => {
  if (slots.title) {
    const titleNodes = slots.title()
    return hasSlotContent(titleNodes)
  }
  return false
})

const noteTitle = computed(() => {
  if (hasTitleSlotContent.value) {
    return undefined
  }
  return props.title || 'Note'
})

const noteColor = 'info'
</script>

<template>
  <UAlert
    :class="props.class"
    :color="noteColor"
    :icon="noteIcon"
    :title="noteTitle"
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
