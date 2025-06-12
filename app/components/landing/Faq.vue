<script lang="ts" setup>
import type { FaqDisplayItem } from '~/types/faq'
import { useLandingFaq } from '~/composables/useLandingFaq'

const { data: tabItems, pending, error } = useLandingFaq()
const appConfig = useAppConfig()

const faqPageMeta = ref({
  title: 'Vision',
  subtitle: 'The Cathedral and the Bazaar...'
})
</script>

<template>
  <UContainer
    v-if="!pending && tabItems && tabItems.length > 0 && !error"
    class="py-12 lg:py-20"
  >
    <div class="max-w-3xl mx-auto">
      <Motion
        :in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :initial="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.7, delay: 0.1 }"
      >
        <h2 class="text-3xl font-bold text-center mb-2 text-[var(--ui-text-highlighted)]">
          {{ faqPageMeta.title }}
        </h2>
      </Motion>

      <Motion
        v-if="faqPageMeta.subtitle"
        :in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :initial="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <LandingOuterboundsSync />
        <p
          class="text-lg text-center text-[var(--ui-text-muted)] mb-10"
        >
          {{ faqPageMeta.subtitle }}
        </p>
      </Motion>

      <Motion
        :in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :initial="{ opacity: 0, y: 20 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <UTabs
          :items="tabItems"
          :ui="appConfig.ui.tabs.faqLanding"
          class="w-full"
          orientation="horizontal"
        >
          <template #content="{ item: displayCategory }">
            <Motion
              :key="displayCategory.key"
              :animate="{ opacity: 1, y: 0 }"
              :initial="{ opacity: 0, y: 10 }"
              :transition="{ duration: 0.4, delay: 0.1 }"
            >
              <div class="mt-6">
                <UAccordion
                  :items="displayCategory.questions"
                  :ui="appConfig.ui.accordion.faqLanding"
                  :unmount-on-hide="false"
                >
                  <template #renderFaqContent="{ item: faqDisplayItem }: { item: FaqDisplayItem }">
                    <ContentRenderer
                      :value="faqDisplayItem.document"
                      class="prose dark:prose-invert max-w-none pt-2 pb-4"
                    />
                  </template>
                </UAccordion>
              </div>
            </Motion>
          </template>
        </UTabs>
      </Motion>
    </div>
  </UContainer>
  <div
    v-else-if="pending"
    class="text-center py-12 lg:py-20"
  >
    <p>Loading FAQs...</p>
  </div>
  <div
    v-else-if="error"
    class="text-center py-12 lg:py-20"
  >
    <p class="text-error-500 dark:text-error-400">
      Could not load FAQs. Please try again later. {{ error.message }}
    </p>
  </div>
  <div
    v-else-if="!pending && tabItems && tabItems.length === 0 && !error"
    class="text-center py-12 lg:py-20"
  >
    <p>No FAQs found.</p>
  </div>
</template>
