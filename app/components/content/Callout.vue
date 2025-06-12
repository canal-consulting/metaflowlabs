<script lang="ts" setup>
interface CalloutProps {
  icon?: string
  color?: string
  title?: string
  class?: string
  to?: string
}

defineSlots<{
  title?: (props: { mdcUnwrap?: string | boolean }) => any
  default?: (props: { mdcUnwrap?: string | boolean }) => any
}>()

const props = withDefaults(defineProps<CalloutProps>(), {
  color: 'secondary'
})

const slots = useSlots()
const { hasSlotContent } = useSlotUtils()

const hasTitleSlotContent = computed(() => {
  if (slots.title) {
    const titleNodes = slots.title()
    return hasSlotContent(titleNodes)
  }
  return false
})

const calloutTitle = computed(() => {
  if (hasTitleSlotContent.value) {
    return undefined
  }
  return props.title
})
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    class="block cursor-pointer rounded-[--ui-radius] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 dark:focus-visible:ring-primary-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
  >
    <UAlert
      :class="props.class"
      :color="props.color"
      :icon="props.icon"
      :title="calloutTitle"
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
  </NuxtLink>
  <UAlert
    v-else
    :class="props.class"
    :color="props.color"
    :icon="props.icon"
    :title="calloutTitle"
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

<style scoped>
/* Styles specific to Callout.vue can be added here if necessary, */
/* but most styling should come from UAlert. */
</style>
