<script lang="ts" setup>
import LandingHero from '~/components/landing/Hero.vue'
import ChallengesSection from '~/components/landing/ChallengesSection.vue'
import LandingFaq from '~/components/landing/Faq.vue'
import Divider from '~/components/Divider.vue'
import type { LandingPageContent } from '~/types'
import { watchEffect } from 'vue'

const {
  data: landingContent,
  error: fetchError
} = await useAsyncData<LandingPageContent | undefined>('landing-page-content', async () => {
  try {
    const content = await queryCollection('landingPage').first()

    if (!content || !content.hero) {
      console.error('Landing page content or hero section not found. Ensure content/landing.yml is correctly formatted and contains a hero object.')
      return undefined
    }

    return {
      hero: content.hero,
      sections: content.sections || []
    } as LandingPageContent
  } catch (e: any) {
    console.error('Failed to fetch landing page content:', e.message)
    return undefined
  }
})

if (fetchError.value && landingContent.value === undefined) {
  console.error('Error fetching landing page data for index.vue:', fetchError.value)
}

watchEffect(() => {
  if (landingContent.value?.hero) {
    useSeoMeta({
      title: landingContent.value.hero.title,
      description: landingContent.value.hero.description,
      titleTemplate: '%s'
    })
  }
})
</script>

<template>
  <div>
    <div v-if="landingContent && landingContent.hero">
      <LandingHero
        :description="landingContent.hero.description"
        :links="landingContent.hero.links"
        :title="landingContent.hero.title"
      />

      <Divider class="my-6 mt-2" />

      <div v-if="landingContent.sections && landingContent.sections.length > 0">
        <template
          v-for="section in landingContent.sections"
          :key="section.id"
        >
          <ChallengesSection
            v-if="section.id === 'challenges'"
          />
        </template>
      </div>

      <Divider class="my-6 mt-2" />

      <LandingFaq />
    </div>
    <div v-else-if="fetchError">
      <p class="text-center p-8 text-error-500 dark:text-error-400">
        Error loading page content. Please check the console for details or try again later.
      </p>
    </div>
    <div
      v-else
      class="text-center p-8"
    >
      <p>Homepage content is currently unavailable.</p>
    </div>
  </div>
</template>
