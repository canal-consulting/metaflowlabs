<script lang="ts" setup>
import { computed } from 'vue'
import { createError, useAsyncData, useRoute } from '#app'
import type { ContentPageInfo } from '~/types'
import type { BreadcrumbItem } from '#ui/types'
import { computedAsync } from '@vueuse/core'
import { useLearnSidebarNavigation } from '~/composables/useLearnSidebarNavigation'

const route = useRoute()

const slugParts = computed<string[]>(() => {
  if (route.params && 'slug' in route.params) {
    const slugFromRoute = route.params.slug

    if (Array.isArray(slugFromRoute)) {
      return slugFromRoute.filter(part => typeof part === 'string' && part.length > 0)
    }
    if (typeof slugFromRoute === 'string' && slugFromRoute.length > 0) {
      return [slugFromRoute]
    }
  }
  return []
})

const contentPath = computed(() => `/learn/${slugParts.value.join('/')}`)

const { data: page, error } = await useAsyncData<ContentPageInfo | null>(
  () => `learn-content-${contentPath.value}`,
  async () => {
    try {
      const result = await queryCollection('learn')
        .path(contentPath.value)
        .first()
      return result as ContentPageInfo | null
    } catch (e: any) {
      console.error(`Error fetching content from collection 'learn' with path '${contentPath.value}':`, e.message)
      throw createError({ statusCode: 500, statusMessage: 'Failed to load content', fatal: true, cause: e })
    }
  }
)

if (import.meta.server && page.value === undefined && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found by query', fatal: true })
}

type ArticleForTitleDisplay = ContentPageInfo & {
  navigation?: boolean | {
    title: string
    description?: string
    icon?: string
  }
}

const getArticleDisplayTitle = (article: ArticleForTitleDisplay): string => {
  if (typeof article.navigation === 'object' && article.navigation.title) {
    return article.navigation.title
  }
  return article.navigationTitle || article.title || 'Untitled Article'
}

const isSectionLandingPage = computed(() => {
  return !!page.value
    && page.value.path === contentPath.value
    && !!page.value.stem
    && page.value.stem.endsWith('/index')
})

const { data: articles } = await useAsyncData<ContentPageInfo[]>(
  `learn-${route.path}-articles`,
  async () => {
    if (isSectionLandingPage.value && page.value && page.value.path) {
      try {
        const currentPagePath = page.value.path
        const normalizedBasePath = currentPagePath === '/' ? '/' : currentPagePath.replace(/\/$/, '')

        const results = await queryCollection('learn')
          .where('path', '<>', normalizedBasePath)
          .where('path', 'LIKE', `${normalizedBasePath}/%`)
          .where('path', 'NOT LIKE', `${normalizedBasePath}/%/%`)
          .order('order', 'ASC')
          .order('title', 'ASC')
          .all()
        return results as ContentPageInfo[]
      } catch (e: any) {
        console.error(`Error fetching articles for section 'learn' (path: ${page.value?.path}):`, e.message)
        return []
      }
    }
    return []
  },
  { watch: [page, isSectionLandingPage] }
)

const breadcrumbs = computedAsync<BreadcrumbItem[]>(async () => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', to: '/', icon: 'i-heroicons-home-solid' },
    { label: 'Learn', to: '/learn', icon: 'i-heroicons-academic-cap-solid' }
  ]

  if (!page.value) return items

  const slugSegments = slugParts.value
  let currentPath = '/learn'

  for (let i = 0; i < slugSegments.length - 1; i++) {
    const segment = slugSegments[i]!
    currentPath += `/${segment}`
    try {
      const segmentIndexPage = await queryCollection('learn')
        .select('title', 'navigationTitle', 'path')
        .path(currentPath)
        .first() as ContentPageInfo | null
      if (segmentIndexPage) {
        items.push({
          label: segmentIndexPage.navigationTitle || segmentIndexPage.title || segment.replaceAll('-', ' '),
          to: currentPath
        })
      } else {
        items.push({ label: (segment || 'section').replaceAll('-', ' '), to: currentPath })
      }
    } catch (e) {
      console.warn(`Failed to fetch index page for breadcrumb segment ${currentPath}:`, e)
      items.push({ label: (segment || 'section').replaceAll('-', ' '), to: currentPath })
    }
  }

  items.push({
    label: page.value.navigationTitle || page.value.title || 'Article'
  })

  return items
}, [])

const { data: surround, pending: _surroundPending, error: _surroundError } = await useAsyncData(
  () => `learn-surround-${contentPath.value}`,
  () => {
    if (!contentPath.value) return Promise.resolve(null)

    return queryCollectionItemSurroundings(
      'learn',
      contentPath.value,
      { before: 1, after: 1, fields: ['title', 'path', 'navigationTitle', 'order'] }
    ).order('order', 'ASC')
  },
  { watch: [contentPath] }
)

const { learnSidebarNavItems } = useLearnSidebarNavigation()

useSeoMeta({
  title: () => page.value?.title || 'Learn Article',
  description: () => page.value?.description || 'Detailed learning material from Metaflowlabs.'
})
</script>

<template>
  <UContainer
    v-if="page"
    class="py-8 lg:py-12"
  >
    <PageLayout>
      <template #breadcrumbs>
        <UBreadcrumb
          v-if="breadcrumbs && breadcrumbs.length > 0"
          :items="breadcrumbs"
        />
      </template>
      <template #aside>
        <LearnSidebar :items="learnSidebarNavItems" />
      </template>
      <template #main>
        <article class="prose dark:prose-invert max-w-none prose-headings:scroll-mt-24">
          <ContentRenderer :value="page" />
        </article>

        <div
          v-if="surround && (surround[0] || surround[1])"
          class="mt-12 pt-8 border-t border-[var(--ui-border)] flex items-center justify-between gap-8"
        >
          <UButton
            v-if="surround[0]"
            :label="(typeof surround[0].navigationTitle === 'string' ? surround[0].navigationTitle : undefined) || surround[0].title"
            :to="surround[0].path"
            class="text-left"
            color="neutral"
            icon="i-heroicons-arrow-left-solid"
            variant="outline"
          >
            <template #label>
              <span class="block text-xs text-[var(--ui-text-muted)] mb-0.5">Previous</span>
              {{ surround[0].navigationTitle || surround[0].title }}
            </template>
          </UButton>
          <span
            v-else
            class="flex-1"
          />

          <UButton
            v-if="surround[1]"
            :label="(typeof surround[1].navigationTitle === 'string' ? surround[1].navigationTitle : undefined) || surround[1].title"
            :to="surround[1].path"
            class="text-right"
            color="neutral"
            icon="i-heroicons-arrow-right-solid"
            trailing
            variant="outline"
          >
            <template #label>
              <span class="block text-xs text-[var(--ui-text-muted)] mb-0.5">Next</span>
              {{ surround[1].navigationTitle || surround[1].title }}
            </template>
          </UButton>
          <span
            v-else
            class="flex-1"
          />
        </div>

        <section
          v-if="isSectionLandingPage && articles && articles.length > 0"
          class="mt-12 pt-8 border-t border-[var(--ui-border)]"
        >
          <h2 class="text-2xl font-semibold mb-6 text-[var(--ui-text-highlighted)]">
            Articles in this section:
          </h2>
          <ul class="space-y-4">
            <li
              v-for="article in articles"
              :key="article.path"
            >
              <NuxtLink
                :to="article.path"
                class="text-lg font-medium text-[var(--ui-primary)] hover:underline"
              >
                {{ getArticleDisplayTitle(article as ArticleForTitleDisplay) }}
              </NuxtLink>
              <p
                v-if="article.description"
                class="mt-1 text-sm text-[var(--ui-text-muted)]"
              >
                {{ article.description }}
              </p>
            </li>
          </ul>
        </section>
      </template>
    </PageLayout>
  </UContainer>
  <div
    v-else-if="error"
    class="text-center p-8"
  >
    <p class="text-xl text-red-500">
      Error loading page: {{ error.message }}
    </p>
    <p v-if="error.statusCode === 404">
      The requested learn section or article could not be found.
    </p>
  </div>
  <div
    v-else
    class="text-center p-8"
  >
    <p>Loading content or content not found...</p>
  </div>
</template>
