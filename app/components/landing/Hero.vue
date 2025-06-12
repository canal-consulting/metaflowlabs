<script lang="ts" setup>
import type { HeroLink } from '~/types'

withDefaults(defineProps<{
  title: string
  description: string
  links?: HeroLink[]
}>(), {
  links: () => []
})
</script>

<template>
  <div class="py-18 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="text-left">
        <Motion
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :transition="{
            duration: 0.3,
            delay: 0.1
          }"
        >
          <h1
            class="max-w-xl text-pretty font-normal text-3xl sm:text-4xl lg:text-5xl text-primary-600 dark:text-primary-400"
          >
            {{ title }}
          </h1>
        </Motion>

        <Motion
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :transition="{
            duration: 0.3,
            delay: 0.2
          }"
        >
          <p class="mt-2 text-lg max-w-2xl text-pretty text-[var(--ui-text-muted)]">
            {{ description }}
          </p>
        </Motion>

        <Motion
          v-if="links && links.length > 0"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :transition="{
            duration: 0.3,
            delay: 0.4
          }"
        >
          <div class="mt-8 flex flex-col sm:flex-row items-center sm:justify-start gap-3">
            <UButton
              v-for="(link, index) in links"
              :key="index"
              :color="link.variant === 'primary' ? 'primary' : (link.variant === 'info' ? 'info' : 'success')"
              :label="link.label"
              :rel="link.to.startsWith('http') ? 'noopener noreferrer' : undefined"
              :target="link.to.startsWith('http') ? '_blank' : undefined"
              :to="link.to"
              size="lg"
            />
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>
