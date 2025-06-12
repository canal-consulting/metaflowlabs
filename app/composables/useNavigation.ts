import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'
import type { NavLink } from '~/types/navigation'

function _useAppNavigationData() {
  const route = useRoute()

  const headerLinks = computed<NavLink[]>(() => [
    {
      label: 'Content',
      to: '/learn',
      icon: 'i-heroicons-academic-cap-solid',
      active: route.path.startsWith('/learn')
    },
    {
      label: 'Projects',
      to: '/projects',
      icon: 'i-heroicons-code-bracket-square-solid',
      active: route.path.startsWith('/projects')
    },
    {
      label: 'Proposal',
      to: '/proposal',
      icon: 'i-heroicons-information-circle-solid',
      active: route.path === '/proposal'
    },
    {
      label: 'Links',
      icon: 'i-lucide-link',
      children: [
        {
          label: 'Metaflow',
          to: 'https://metaflow.org/',
          target: '_blank'

        },
        {
          label: 'Outerbounds',
          to: 'https://outerbounds.com/',
          target: '_blank'

        }
      ]
    }
  ])

  const footerLinks = computed<NavLink[][]>(() => [

    [
      { label: 'Resources', type: 'label' },
      { label: 'Content', to: '/learn', icon: 'i-heroicons-academic-cap-solid' },
      { label: 'Projects', to: '/projects', icon: 'i-heroicons-code-bracket-square-solid' },
      { label: 'Proposal', to: '/proposal', icon: 'i-heroicons-information-circle-solid' }
    ],
    [
      { label: 'Ecosystem', type: 'label' },
      { label: 'Metaflow Docs', to: 'https://docs.metaflow.org/', target: '_blank', icon: 'i-lucide-book-marked' },
      { label: 'Outerbounds', to: 'https://outerbounds.com/', target: '_blank', icon: 'i-lucide-cloud' },
      { label: 'GitHub', to: 'https://github.com/metaflowlabs', target: '_blank', icon: 'i-simple-icons-github' }
    ]
  ])

  return { headerLinks, footerLinks }
}

export const useNavigation = createSharedComposable(_useAppNavigationData)
