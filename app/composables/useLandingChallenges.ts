import type {
  ChallengeDisplayItem,
  ChallengeMarkdownItem,
  ChallengeSectionInfo,
  LandingChallengesData
} from '~/types/challenges'

export const useLandingChallenges = () => {
  return useAsyncData<LandingChallengesData | null>('landing-challenges-data', async () => {
    const rawChallengeDocs = await queryCollection('challenges')
      .order('order', 'ASC')
      .all()

    if (!rawChallengeDocs || rawChallengeDocs.length === 0) {
      console.warn('No documents found in "challenges" collection. Ensure content/challenges/ has .md files including _section.md.')
      return null
    }

    let sectionInfo: ChallengeSectionInfo | null = null
    const challengeItems: ChallengeDisplayItem[] = []

    for (const doc of rawChallengeDocs as ChallengeMarkdownItem[]) {
      if (doc.path === '/challenges/_section') {
        if (doc.title && doc.body) {
          sectionInfo = {
            title: doc.title,
            descriptionBody: doc.body
          }
        } else {
          console.warn('The _section.md file (expected at /challenges/_section) is missing its title or body content.', doc)
        }
      } else {
        if (
          typeof doc.summary === 'string'
          && typeof doc.icon === 'string'
          && typeof doc.order === 'number'
          && doc.body
        ) {
          challengeItems.push({
            path: doc.path,
            title: doc.title,
            summary: doc.summary,
            icon: doc.icon,
            order: doc.order,
            body: doc.body
          })
        } else {
          console.warn(
            `Challenge document at ${doc.path} is missing required fields (title, summary, icon, order) or has invalid types. It will be filtered out.`,
            { title: doc.title, summary: doc.summary, icon: doc.icon, order: doc.order }
          )
        }
      }
    }

    if (!sectionInfo) {
      console.error('Critical error: _section.md metadata (title and body) could not be processed. Challenges section will not render correctly.')
      return null
    }

    return {
      section: sectionInfo,
      items: challengeItems
    }
  })
}
