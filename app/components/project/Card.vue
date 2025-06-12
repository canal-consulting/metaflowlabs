<script lang="ts" setup>
import type { Project } from '~/types'
import { Motion } from 'motion-v'
import { slugify } from '~/utils'

defineProps<{
  project: Project
}>()
</script>

<template>
  <Motion
    :hover="{ scale: 1.02, y: -3 }"
    :transition="{ duration: 0.2, ease: 'easeOut' }"
    as="div"
    class="block h-full cursor-pointer"
  >
    <NuxtLink
      :to="project.path"
      class="block h-full"
    >
      <UCard
        :ui="{
          root: 'relative w-full h-full flex flex-col ring-1 ring-[var(--ui-border-accented)] bg-[var(--ui-bg)]',
          header: 'px-4 py-3 sm:px-6 sm:py-2',
          body: 'p-3 flex-1',
          footer: 'px-3 py-3 sm:px-6 sm:py-2'
        }"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon
              v-if="project.icon"
              :name="project.icon"
              class="size-2 text-[var(--ui-primary)]"
            />
            <h3 class="text-lg font-semibold text-[var(--ui-text-toned)]">
              {{ project.title }}
            </h3>
          </div>
        </template>

        <p class="text-sm text-[var(--ui-text-muted)] line-clamp-2">
          {{ project.description }}
        </p>

        <template #footer>
          <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-if="project.phase"
                :to="`/projects?phase=${slugify(project.phase)}`"
              >
                <UBadge
                  :label="project.phase"
                  color="primary"
                  size="md"
                  variant="soft"
                />
              </NuxtLink>
              <template v-if="project.category && project.category.length">
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
              </template>
            </div>
          </div>
        </template>
      </UCard>
    </NuxtLink>
  </Motion>
</template>
