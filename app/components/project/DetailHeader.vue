<script lang="ts" setup>
import type { Project } from '~/types'
import { slugify } from '~/utils'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div class="border-b border-[var(--ui-border)] pb-6 mb-8 space-y-4">
    <div class="flex items-center gap-3">
      <UIcon
        v-if="project.icon"
        :name="project.icon"
        class="text-4xl lg:text-5xl flex-shrink-0 text-[var(--ui-text-highlighted)]"
      />
      <h1 class="text-3xl lg:text-4xl font-bold text-[var(--ui-text-highlighted)]">
        {{ project.title }}
      </h1>
    </div>

    <p
      v-if="project.description"
      class="text-lg text-[var(--ui-text-muted)]"
    >
      {{ project.description }}
    </p>

    <div class="space-y-2">
      <div v-if="project.phase">
        <NuxtLink :to="`/projects?phase=${slugify(project.phase)}`">
          <UBadge
            :label="project.phase"
            color="neutral"
            size="md"
            variant="subtle"
          />
        </NuxtLink>
      </div>
      <div
        v-if="project.category && project.category.length > 0"
        class="flex flex-wrap gap-2"
      >
        <NuxtLink
          v-for="cat in project.category"
          :key="cat"
          :to="`/projects?category=${slugify(cat)}`"
        >
          <UBadge
            :label="cat"
            color="neutral"
            size="md"
            variant="outline"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
