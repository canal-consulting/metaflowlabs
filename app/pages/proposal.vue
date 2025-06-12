<script lang="ts" setup>
import PageLayout from '~/components/PageLayout.vue'
import type { ProposalPageContent } from '~/types/proposal'

const { data: pageData, error, pending } = await useAsyncData<ProposalPageContent | undefined>(
  'proposal-page-content',
  async () => {
    const item = await queryCollection('proposalPage').first()
    return item || undefined
  }
)

if (pageData.value) {
  useSeoMeta({
    title: () => pageData.value!.title || 'Proposal',
    description: () => pageData.value!.description || 'Learn more proposal Metaflowlabs, our mission, and our work.'
  })
} else if (error.value) {
  console.error('Failed to load proposal page content:', error.value)
  useSeoMeta({
    title: 'Error Loading Page',
    description: 'Could not load the page content. Please try again later.'
  })
} else {
  useSeoMeta({
    title: 'Proposal Us',
    description: 'Learn more proposal Metaflowlabs, our mission, and our work.'
  })
}
</script>

<template>
  <PageLayout>
    <template #main>
      <UContainer
        v-if="pending"
        class="py-8 text-center"
      >
        <p>Loading page content...</p>
      </UContainer>
      <UContainer
        v-else-if="error || !pageData"
        class="py-8 text-center"
      >
        <p
          v-if="error"
          class="text-error-500 dark:text-error-400"
        >
          We encountered an error loading the page content. Please try refreshing the page.
        </p>
        <p
          v-else
          class="text-warning-500 dark:text-warning-400"
        >
          The content for this page is currently unavailable. Please check back later.
        </p>
      </UContainer>
      <UContainer
        v-else-if="pageData"
        class="py-12 max-w-6xl mx-auto"
      >
        <h1
          class="text-3xl sm:text-4xl font-bold text-[var(--ui-text-highlighted)] mb-10 pb-4 border-b border-[var(--ui-border)]"
        >
          {{ pageData.title }}
        </h1>
        <article class="prose dark:prose-invert max-w-5xl">
          <ContentRenderer :value="pageData">
            <template #empty>
              <p>This page is under construction. Content coming soon!</p>
            </template>
          </ContentRenderer>
        </article>
      </UContainer>
    </template>
  </PageLayout>
</template>
