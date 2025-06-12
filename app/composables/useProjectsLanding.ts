import { queryCollection, useAsyncData } from '#imports'
import { useProjectFilters } from '~/composables/useProjectFilters'
import type { ProjectsLandingData } from '~/types'

export const useProjectsLanding = () => {
  const { selectedPhases, selectedCategories } = useProjectFilters()

  const cacheKey = () => `projects-landing-phases-${selectedPhases.value.join('-') || 'all'}-categories-${selectedCategories.value.join('-') || 'all'}`

  const { data: page, pending, error } = useAsyncData<ProjectsLandingData | null>(
    cacheKey,
    async () => {
      const currentSelectedPhases = selectedPhases.value
      const currentSelectedCategories = selectedCategories.value

      const genericLandingData: ProjectsLandingData = {
        title: 'Projects',
        description: 'Explore projects developed by Metaflowlabs.'
      }

      try {
        if (currentSelectedCategories.length > 0 || currentSelectedPhases.length > 1) {
          return genericLandingData
        }

        let result: ProjectsLandingData | null = null
        const qc = queryCollection('projectsLanding')

        if (currentSelectedPhases.length === 1) {
          result = await qc.where('phase', '=', currentSelectedPhases[0]).first()
        } else {
          result = await qc.where('id', '=', '2.projects:projects').first()
        }

        return result ?? genericLandingData
      } catch (e) {
        console.error('[useProjectsLanding] Failed to fetch specific landing page data:', e)
        return genericLandingData
      }
    },
    { watch: [selectedPhases, selectedCategories], server: true }
  )

  return { page, pending, error }
}
