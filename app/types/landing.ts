export interface HeroLink {
  label: string
  to: string
  variant?: 'primary' | 'secondary' | 'info'
}

export interface PageHero {
  title: string
  description: string
  links?: HeroLink[]
}

export interface LandingSection {
  id: string
  title?: string
  description?: string
  items?: any[]
}

export interface LandingPageContent {
  hero: PageHero
  sections?: LandingSection[]
}
