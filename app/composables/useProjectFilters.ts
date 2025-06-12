import { useRoute, useRouter } from 'vue-router'

export const useProjectFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const selectedPhases = ref<string[]>([])
  const selectedCategories = ref<string[]>([])

  const parseQueryParamToArray = (queryParamValue: unknown): string[] => {
    let paramStr = ''
    if (Array.isArray(queryParamValue)) {
      paramStr = queryParamValue.length > 0 ? String(queryParamValue[0]) : ''
    } else if (typeof queryParamValue === 'string') {
      paramStr = queryParamValue
    }

    if (paramStr.trim() !== '') {
      return paramStr.split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
    }
    return []
  }

  watchEffect(() => {
    const newPhasesFromURL = parseQueryParamToArray(route.query.phase)
    if (JSON.stringify(selectedPhases.value) !== JSON.stringify(newPhasesFromURL)) {
      selectedPhases.value = newPhasesFromURL
    }

    const newCategoriesFromURL = parseQueryParamToArray(route.query.category)
    if (JSON.stringify(selectedCategories.value) !== JSON.stringify(newCategoriesFromURL)) {
      selectedCategories.value = newCategoriesFromURL
    }
  })

  const _updateUrlQuery = () => {
    const currentRouteQuery = { ...route.query }
    const newQueryForRouter: Record<string, string | undefined> = {}

    for (const key in currentRouteQuery) {
      if (key !== 'phase' && key !== 'category') {
        if (typeof currentRouteQuery[key] === 'string') {
          newQueryForRouter[key] = currentRouteQuery[key] as string
        } else if (Array.isArray(currentRouteQuery[key]) && currentRouteQuery[key]!.length > 0) {
          if (typeof currentRouteQuery[key]![0] === 'string') {
            newQueryForRouter[key] = currentRouteQuery[key]![0] as string
          }
        }
      }
    }

    if (selectedPhases.value.length > 0) {
      newQueryForRouter.phase = selectedPhases.value.join(',')
    }

    if (selectedCategories.value.length > 0) {
      newQueryForRouter.category = selectedCategories.value.join(',')
    }

    const queryToString = (q: Record<string, any>): string => {
      const relevantKeys = Object.keys(q)
        .filter(k => q[k] !== undefined && q[k] !== null)
        .sort()

      return relevantKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(String(q[k]))}`).join('&')
    }

    const currentQueryAsString = queryToString(currentRouteQuery)
    const newQueryAsString = queryToString(newQueryForRouter)

    if (currentQueryAsString !== newQueryAsString) {
      router.replace({ query: newQueryForRouter })
    }
  }

  const setFilterValues = (dimension: 'phase' | 'category', newValues: string[]) => {
    const valuesToSet = [...new Set(newValues.map(s => String(s).trim()).filter(s => s !== ''))]

    if (dimension === 'phase') {
      if (JSON.stringify(selectedPhases.value) !== JSON.stringify(valuesToSet)) {
        selectedPhases.value = valuesToSet
      }
    } else if (dimension === 'category') {
      if (JSON.stringify(selectedCategories.value) !== JSON.stringify(valuesToSet)) {
        selectedCategories.value = valuesToSet
      }
    }

    _updateUrlQuery()
  }

  return {
    selectedPhases,
    selectedCategories,
    setFilterValues
  }
}
