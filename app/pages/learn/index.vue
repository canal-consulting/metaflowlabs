<script lang="ts" setup>
import { computed, createError, queryCollection, useAsyncData, useSeoMeta } from '#imports'
import { useLearnSidebarNavigation } from '~/composables/useLearnSidebarNavigation'
import type { ContentPageInfo } from '~/types'
import type { BreadcrumbItem } from '#ui/types'

definePageMeta({
  breadcrumb: { label: 'Learn', icon: 'i-heroicons-academic-cap-solid' }
})

const breadcrumbs = computed<BreadcrumbItem[]>((() => [
  { label: 'Home', to: '/', icon: 'i-heroicons-home-solid' },
  { label: 'Learn', icon: 'i-heroicons-academic-cap-solid' }
]) as () => BreadcrumbItem[])

const { data: pageData, error: pageError } = await useAsyncData<ContentPageInfo | null>('learn-root-page', async () => {
  const result = await queryCollection('learn').path('/learn').first()
  return result as ContentPageInfo | null
})

const { learnSidebarNavItems } = useLearnSidebarNavigation()

if (import.meta.server && pageError.value) {
  console.error('Error fetching learn landing page on server:', pageError.value)
  throw createError({ statusCode: 500, statusMessage: 'Failed to load learning resources', fatal: true })
} else if (import.meta.client && pageError.value) {
  console.error('Error fetching learn landing page:', pageError.value)
}

if (import.meta.server && !pageData.value && !pageError.value) {
  throw createError({ statusCode: 404, statusMessage: 'Learning resources page not found', fatal: true })
}

useSeoMeta({
  title: () => pageData.value?.title || 'Learn',
  description: () => pageData.value?.description || 'Explore learning resources for Metaflow.'
})
</script>

<template>
  <UContainer class="py-8 lg:py-12">
    <PageLayout>
      <template #breadcrumbs>
        <UBreadcrumb :items="breadcrumbs" />
      </template>
      <template #aside>
        <LearnSidebar :items="learnSidebarNavItems" />
      </template>
      <template #main>
        <div v-if="pageError && !pageData">
          <p class="text-center text-lg text-error-500 dark:text-error-400">
            Error loading page content. Please try again later.
          </p>
          <p
            v-if="pageError.message"
            class="text-center text-sm text-[var(--ui-text-muted)]"
          >
            Details: {{ pageError.message }}
          </p>
        </div>
        <ContentRenderer
          v-else-if="pageData"
          :value="pageData"
          class="prose dark:prose-invert max-w-none"
        />
        <div
          v-else-if="!pageData && !pageError"
          class="text-center"
        >
          <p class="text-lg">
            Learning resources page not found.
          </p>
        </div>
        <div
          v-else
          class="text-center"
        >
          <p>Loading learning resources...</p>
        </div>
      </template>
    </PageLayout>
  </UContainer>
</template>
