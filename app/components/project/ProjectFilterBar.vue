<script lang="ts" setup>
interface FilterOption {
  key: string
  label: string
  count?: number
}

interface FilterGroup {
  dimensionKey: string
  title: string
  options: FilterOption[]
  selectedValues: string[]
}

interface Props {
  filterGroup: FilterGroup
  titleClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  titleClass: 'text-sm font-semibold uppercase tracking-wide text-[var(--ui-text-muted)] mb-0'
})

interface UpdateFilterGroupPayload {
  dimensionKey: string
  newSelectedValues: string[]
}

const emit = defineEmits<{
  (e: 'update:filterGroup', payload: UpdateFilterGroupPayload): void
}>()

function handleButtonClick(
  optionKey: string
) {
  const { dimensionKey, selectedValues: currentSelectedValues } = props.filterGroup

  const newSelected = new Set(currentSelectedValues)
  if (newSelected.has(optionKey)) {
    newSelected.delete(optionKey)
  } else {
    newSelected.add(optionKey)
  }
  emit('update:filterGroup', { dimensionKey, newSelectedValues: Array.from(newSelected) })
}
</script>

<template>
  <div
    v-if="filterGroup"
    class="flex flex-col gap-y-2.5 items-start"
  >
    <div
      :key="filterGroup.dimensionKey"
      class="space-y-2 w-full"
    >
      <div class="grid grid-cols-[6rem,1fr] gap-x-4 items-center">
        <div class="flex flex-row flex-wrap gap-x-2 gap-y-2 items-center">
          <h3 :class="props.titleClass">
            {{ filterGroup.title }}
          </h3>
          <UButton
            v-for="option in filterGroup.options"
            :key="option.key"
            :active="filterGroup.selectedValues.includes(option.key)"
            :label="option.label + (option.count ? ` (${option.count})` : '')"
            active-color="primary"
            active-variant="solid"
            color="neutral"
            size="sm"
            variant="outline"
            @click="handleButtonClick(option.key)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
