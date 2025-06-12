import { computed, watch } from 'vue'
import { queryCollection, useAsyncData, useState } from '#imports'

import type { Project } from '~/types'
import { useProjectFilters } from '~/composables/useProjectFilters'
import { slugify } from '~/utils'

export interface FilterOption {
  key: string
  label: string
}

export const useProjects = () => {
  const projects = useState<Project[]>('projects-list', () => [])
  const { selectedPhases, selectedCategories } = useProjectFilters()

  const { data: fetchedData, error: fetchError, pending } = useAsyncData<Project[]>('projects-fetch', async () => {
    try {
      const fetchedProjects = await queryCollection('projects')
        .order('phase', 'ASC')
        .order('title', 'ASC')
        .all()

      if (Array.isArray(fetchedProjects)) {
        return fetchedProjects as Project[]
      }
      console.warn('[useProjects] fetchedProjects was null or not an array.')
      return []
    } catch (e) {
      console.error('[useProjects] Failed to fetch projects inside useAsyncData:', e)
      return []
    }
  }, {
    server: true
  })

  watch(fetchedData, (newData) => {
    if (newData) {
      projects.value = newData
    }
  }, { immediate: true })

  const phaseOptions = computed<FilterOption[]>(() => {
    const uniquePhaseLabels = [...new Set(
      projects.value
        .map(p => p.phase)
        .filter((ph): ph is string => typeof ph === 'string' && ph.trim() !== '')
    )]

    return uniquePhaseLabels
      .map((phaseLabel): FilterOption => {
        return {
          key: slugify(phaseLabel),
          label: phaseLabel
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const categoryOptions = computed<FilterOption[]>(() => {
    const allCategories = projects.value.flatMap(p => p.category || [])
    const uniqueCategoryLabels = [...new Set(
      allCategories.filter((cat): cat is string => typeof cat === 'string' && cat.trim() !== '')
    )]

    return uniqueCategoryLabels
      .map((categoryLabel): FilterOption => {
        return {
          key: slugify(categoryLabel),
          label: categoryLabel
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const filteredProjects = computed<Project[]>(() => {
    const allProjs = projects.value
    const activePhaseSlugs = selectedPhases.value
    const activeCategorySlugs = selectedCategories.value

    if (activePhaseSlugs.length === 0 && activeCategorySlugs.length === 0) {
      return allProjs
    }

    return allProjs.filter((project) => {
      const projectPhaseSlug = project.phase ? slugify(project.phase) : ''
      const phaseMatch = activePhaseSlugs.length === 0
        || (projectPhaseSlug && activePhaseSlugs.includes(projectPhaseSlug))

      if (activePhaseSlugs.length > 0 && !phaseMatch) {
        return false
      }

      const projectCategorySlugs = project.category ? project.category.map(cat => slugify(cat)) : []
      const categoryMatch = activeCategorySlugs.length === 0
        || (projectCategorySlugs.length > 0 && projectCategorySlugs.some(pcs => activeCategorySlugs.includes(pcs)))

      return phaseMatch && categoryMatch
    })
  })

  return {
    projects,
    phaseOptions,
    categoryOptions,
    filteredProjects,
    pending,
    error: fetchError
  }
}
