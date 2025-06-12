<script lang="ts" setup>
import { computed } from 'vue'
import { Motion } from 'motion-v' // Add this import

import ProjectFilterBar from '~/components/project/ProjectFilterBar.vue'
import { type FilterOption as ProjectFilterOption, useProjects } from '~/composables/useProjects'
import { useProjectsLanding } from '~/composables/useProjectsLanding'
import { useProjectFilters } from '~/composables/useProjectFilters'
import { useSeoMeta } from '#imports'
import type { BreadcrumbItem } from '#ui/types'

const { selectedPhases, selectedCategories, setFilterValues } = useProjectFilters()

const {
  phaseOptions,
  categoryOptions,
  filteredProjects,
  pending: projectsPending,
  error: projectsError
} = useProjects()

const {
  page: projectsLandingPage,
  pending: landingPending,
  error: landingError
} = useProjectsLanding()

const pageTitle = computed(() => projectsLandingPage.value?.title || 'Projects')
const pageDescription = computed(() => projectsLandingPage.value?.description || 'Explore projects developed by Metaflowlabs.')

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/', icon: 'i-heroicons-home-solid' },
  { label: 'Projects', icon: 'i-heroicons-code-bracket-square-solid' }
])

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value
})

interface FilterSidebarGroup {
  dimensionKey: string
  title: string
  options: ProjectFilterOption[]
  selectedValues: string[]
}

const filterSidebarGroups = computed<FilterSidebarGroup[]>(() => {
  const groups: FilterSidebarGroup[] = []

  if (phaseOptions.value && phaseOptions.value.length > 0) {
    groups.push({
      dimensionKey: 'phase',
      title: 'Phase',
      options: phaseOptions.value,
      selectedValues: selectedPhases.value
    })
  }

  if (categoryOptions.value && categoryOptions.value.length > 0) {
    groups.push({
      dimensionKey: 'category',
      title: 'Category',
      options: categoryOptions.value,
      selectedValues: selectedCategories.value
    })
  }
  return groups
})

const handleUpdateFilterGroup = (payload: { dimensionKey: string, newSelectedValues: string[] }) => {
  setFilterValues(payload.dimensionKey as 'phase' | 'category', payload.newSelectedValues)
}
</script>

<template>
  <UContainer class="py-8 lg:py-12">
    <div class="grid grid-cols-12 gap-4">
      <PageLayout class="col-span-12">
        <template #breadcrumbs>
          <UBreadcrumb :items="breadcrumbs" />
        </template>

        <div class="flex flex-col justify-start mb-6 lg:mb-6">
          <div
            v-if="!projectsPending && !landingPending && filterSidebarGroups.length > 0"
            class="space-y-0 mb-0 ml-20"
          >
            <div
              v-for="(group, index) in filterSidebarGroups"
              :key="group.dimensionKey"
              :aria-labelledby="`filter-group-title-${group.dimensionKey}`"
              :class="{ 'mb-1': index === 0, 'mb-0': index === filterSidebarGroups.length -1 }"
              class="p-1 rounded-md bg-[--ui-bg-muted] dark:bg-[--ui-bg-elevated] shadow-sm"
              role="group"
            >
              <h3
                :id="`filter-group-title-${group.dimensionKey}`"
                class="sr-only"
              >
                Filter by {{ group.title }}
              </h3>
              <ProjectFilterBar
                :class="index === 0 ? 'pb-1' : 'pb-1'"
                :filter-group="group"
                :title-class="index === 0 ? 'text-sm font-bold uppercase tracking-wide text-[var(--ui-text-muted)] mb-0 mr-7': 'text-sm font-bold uppercase tracking-wide text-[var(--ui-text-muted)] mb-0'"
                @update:filter-group="handleUpdateFilterGroup"
              />
            </div>
          </div>
          <p
            v-else-if="!projectsPending && !landingPending && filterSidebarGroups.length === 0"
            class="text-sm text-[var(--ui-text-muted)] text-center mb-6 lg:mb-8"
          >
            No filter options available.
          </p>
        </div>

        <div
          v-if="projectsPending || landingPending"
          class="flex flex-col items-center justify-center h-64"
        >
          <UIcon
            class="animate-spin text-4xl text-[var(--ui-primary)]"
            name="i-lucide-loader-circle"
          />
        </div>
        <div
          v-else-if="projectsError || landingError"
          class="text-center text-error-500 dark:text-error-400"
        >
          Error loading projects. Please try again later.
        </div>
        <ProjectGrid v-else-if="filteredProjects.length > 0">
          <Motion
            v-for="(project, index) in filteredProjects"
            :key="project.path"
            tag="div"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, delay: index * 0.075, ease: 'easeOut' }"
            class="h-full"
          >
            <ProjectCard
              :project="project"
              class="h-full"
            />
          </Motion>
        </ProjectGrid>
        <ProjectEmptyCard v-else />
      </PageLayout>
    </div>
  </UContainer>
</template>
