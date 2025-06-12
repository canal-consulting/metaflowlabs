import type { FaqDisplayCategory, FaqDisplayItem } from '~/types/faq'

export const useLandingFaq = () => {
  return useAsyncData<FaqDisplayCategory[]>('landing-faq-data', async () => {
    const rawFaqItems = await queryCollection('faq')
      .all()

    if (!rawFaqItems || rawFaqItems.length === 0) {
      return []
    }

    const categoriesMap: Record<string, FaqDisplayItem[]> = {}

    for (const item of rawFaqItems) {
      if (!item.category || !item.title) {
        continue
      }

      const currentCategoryKey = item.category

      if (!categoriesMap[currentCategoryKey]) {
        categoriesMap[currentCategoryKey] = []
      }

      const itemsList = categoriesMap[currentCategoryKey]
      itemsList.push({
        label: item.title,
        document: item,
        slot: 'renderFaqContent'
      })
    }

    return Object.entries(categoriesMap)
      .map(([categoryName, questions]) => {
        let sortKey = ''

        const firstQuestion = questions[0]
        if (firstQuestion?.document?.path) {
          const pathSegments = firstQuestion.document.path.split('/')
          if (pathSegments.length > 1) {
            const segment1 = pathSegments[1]
            if (segment1 !== undefined) {
              const parts = segment1.split('.')
              const firstPart = parts[0]

              if (firstPart !== undefined && /^\d+$/.test(firstPart)) {
                sortKey = firstPart
              } else {
                sortKey = segment1
              }
            }
          }
        }

        return {
          label: categoryName,
          key: categoryName.toLowerCase().replace(/\s+/g, '-'),
          questions,
          _sortKey: sortKey
        }
      })
      .sort((a, b) => {
        const keyA = a._sortKey || ''
        const keyB = b._sortKey || ''
        return keyA.localeCompare(keyB, undefined, { numeric: true, sensitivity: 'base' })
      })
  })
}
