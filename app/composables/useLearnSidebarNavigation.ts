import type { NavigationMenuItem } from '#ui/types'

const learnSidebarNavigationData: Readonly<NavigationMenuItem[]> = [
  {
    label: 'Deep Dives',
    to: '/learn/deep-dives'
  },
  {
    label: 'Patterns',
    to: '/learn/patterns'
  },
  {
    label: 'Guides',
    to: '/learn/guides'
  },
  {
    label: 'Open Source',
    to: '/learn/open-source'
  }
]

export function useLearnSidebarNavigation() {
  return {
    learnSidebarNavItems: computed(() => learnSidebarNavigationData)
  }
}
