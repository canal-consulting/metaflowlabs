<script lang="ts" setup>
interface DescriptionSegment {
  text: string
}

interface FeatureListItem {
  id: string | number
  label: string
  description: (string | DescriptionSegment)[]
  to?: string
}

defineSlots<{
  title?: (props: { mdcUnwrap?: string | boolean }) => any
  default?: (props: { mdcUnwrap?: string | boolean }) => any
}>()

const props = defineProps<{
  items: FeatureListItem[]
  title?: string
  titleTo?: string
}>()

const slots = useSlots()
const { hasSlotContent } = useSlotUtils()

const hasTitleSlot = computed(() => hasSlotContent(slots.title?.()))
const hasDefaultSlot = computed(() => hasSlotContent(slots.default?.()))

const focusRingClasses = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 dark:focus-visible:ring-primary-400/50 rounded-sm focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900'
const labelFocusRingClasses = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 dark:focus-visible:ring-primary-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900'
</script>

<template>
  <div class="feature-reference-list-wrapper">
    <div
      v-if="hasTitleSlot"
      class="text-lg font-semibold mb-3"
    >
      <NuxtLink
        v-if="props.titleTo"
        :class="['text-primary-600 dark:text-primary-400', focusRingClasses]"
        :to="props.titleTo"
      >
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </NuxtLink>
      <slot
        v-else
        mdc-unwrap="p"
        name="title"
      />
    </div>
    <h3
      v-else-if="props.title"
      class="text-lg font-bold mb-3"
    >
      <NuxtLink
        v-if="props.titleTo"
        :class="['text-primary-600 dark:text-primary-400', focusRingClasses]"
        :to="props.titleTo"
      >
        {{ props.title }}
      </NuxtLink>
      <span v-else>{{ props.title }}</span>
    </h3>

    <div
      v-if="hasDefaultSlot"
      class="prose prose-sm dark:prose-invert mb-4"
    >
      <slot
        mdc-unwrap="p"
        name="default"
      />
    </div>

    <div
      v-if="props.items && props.items.length > 0"
      class="feature-reference-list list-none p-0 m-0"
    >
      <div
        v-for="(item, itemIndex) in props.items"
        :key="item.id"
        class="flex items-start space-x-3 py-1.5"
      >
        <NuxtLink
          v-if="item.to"
          :class="['flex-shrink-0 mt-0.5 rounded-md', labelFocusRingClasses]"
          :to="item.to"
        >
          <span
            class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-sm font-medium rounded-md text-primary-600 dark:text-primary-400"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
        <span
          v-else
          class="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-medium rounded-md flex-shrink-0 mt-0.5"
        >
          {{ item.label }}
        </span>

        <div class="flex-1 description-text text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <template
            v-for="(segment, segmentIndex) in item.description"
            :key="`item-${itemIndex}-segment-${segmentIndex}`"
          >
            <span
              v-if="typeof segment === 'string'"
              class="text-base"
            >{{ segment }}</span>
            <span
              v-else
              class="text-base"
            >{{ segment.text }}</span>
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No items provided.</p>
    </div>
  </div>
</template>

<style scoped>
.feature-reference-list-wrapper {
}
</style>
