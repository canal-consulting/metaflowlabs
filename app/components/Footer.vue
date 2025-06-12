<script lang="ts" setup>
import { useNavigation } from '~/composables/useNavigation'
import type { NavLink } from '~/types/navigation'

const { footerLinks } = useNavigation()
const currentYear = new Date().getFullYear()
const llmsLinkPath = '/llms-full.txt'

const getLinksForColumn = (items: NavLink[]): NavLink[] => {
  if (items.length > 0 && items[0] && items[0].type === 'label') {
    return items.slice(1)
  }
  return items
}
</script>

<template>
  <footer class="border-t border-[var(--ui-border)] mt-auto">
    <UContainer class="py-8 lg:py-12">
      <div
        v-if="footerLinks && footerLinks.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12"
      >
        <p class="text-xs text-[var(--ui-text-muted)]">
          © {{ currentYear }} Metaflowlabs. All rights reserved.
        </p>
        <div
          v-for="(columnItems, columnIndex) in footerLinks"
          :key="`footer-col-${columnIndex}`"
        >
          <h3
            v-if="columnItems.length > 0 && columnItems[0] && columnItems[0].type === 'label'"
            class="text-sm font-semibold text-[var(--ui-text-highlighted)] mb-3"
          >
            {{ columnItems[0]?.label }}
          </h3>
          <ul
            class="space-y-3"
            role="list"
          >
            <li
              v-for="link in getLinksForColumn(columnItems)"
              :key="link.label + (link.to || '')"
            >
              <ULink
                v-if="link.to"
                :target="link.target"
                :to="link.to"
                active-class="text-sm text-[var(--ui-text-highlighted)] font-semibold"
                class="text-sm"
                inactive-class="text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)]"
              >
                {{ link.label }}
              </ULink>
              <span
                v-else
                class="text-sm text-[var(--ui-text-muted)]"
              >{{ link.label }}</span>
            </li>
          </ul>
        </div>
        <ULink
          :to="llmsLinkPath"
          class="text-xs text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)]"
          target="_blank"
        >
          llms.txt
        </ULink>
      </div>
    </UContainer>
  </footer>
</template>
