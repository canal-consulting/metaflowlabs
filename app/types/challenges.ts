export interface ChallengeMarkdownItem {
  path: string
  title: string
  body: any
  description?: string
  summary?: string
  icon?: string
  order?: number
}

export interface ChallengeSectionInfo {
  title: string
  descriptionBody: any
}

export interface ChallengeDisplayItem {
  path: string
  title: string
  summary: string
  icon: string
  order: number
  body: any
}

export interface LandingChallengesData {
  section: ChallengeSectionInfo
  items: ChallengeDisplayItem[]
}
