<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Motion } from 'motion-v'
import { useLandingChallenges } from '~/composables/useLandingChallenges'
import type { ChallengeDisplayItem } from '~/types/challenges'

const { data: landingChallengesData, pending, error } = useLandingChallenges()

const activeChallengePath = ref<string | null>(null)

watch(landingChallengesData, (newData) => {
  if (newData && newData.items && newData.items.length > 0 && newData.items[0] && typeof newData.items[0].path === 'string') {
    activeChallengePath.value = newData.items[0].path
  } else {
    activeChallengePath.value = null
  }
}, { immediate: true })

function selectChallenge(path: string) {
  activeChallengePath.value = path
}

const activeChallenge = computed<ChallengeDisplayItem | null>(() => {
  if (!landingChallengesData.value || !landingChallengesData.value.items || !activeChallengePath.value) {
    return null
  }
  return landingChallengesData.value.items.find(item => item.path === activeChallengePath.value) || null
})
</script>

<template>
  <div
    v-if="pending"
    class="text-center py-12 lg:py-20"
  >
    <p>Loading challenges...</p>
  </div>
  <div
    v-else-if="error"
    class="text-center py-12 lg:py-20"
  >
    <p class="text-error-500 dark:text-error-400">
      Error loading challenges. Please try again later.
    </p>
  </div>
  <UContainer
    v-else-if="landingChallengesData && landingChallengesData.section && landingChallengesData.items"
    class="py-12 lg:py-20 max-w-5xl"
  >
    <Motion
      :in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :initial="{ opacity: 0, y: 20 }"
      :transition="{ duration: 0.5, delay: 0.1 }"
    >
      <h2 class="text-2xl font-semibold mb-4 text-[var(--ui-text-highlighted)] text-center lg:text-left">
        {{ landingChallengesData.section.title }}
      </h2>
    </Motion>

    <Motion
      :in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :initial="{ opacity: 0, y: 20 }"
      :transition="{ duration: 0.5, delay: 0.2 }"
    >
      <MDC
        :value="landingChallengesData.section.descriptionBody"
        class="text-base text-[var(--ui-text-muted)] max-w-3xl mb-10 mx-auto lg:mx-0 text-center lg:text-left prose dark:prose-invert"
      />
    </Motion>

    <Motion
      :in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :initial="{ opacity: 0, y: 20 }"
      :transition="{ duration: 0.5, delay: 0.3 }"
    >
      <div class="grid lg:grid-cols-3 gap-10">
        <ul class="space-y-4 col-span-1">
          <Motion
            v-for="(c, index) in landingChallengesData.items"
            :key="c.path"
            :animate="{ opacity: 1, x: 0 }"
            :initial="{ opacity: 0, x: -20 }"
            :transition="{ duration: 0.4, delay: 0.1 * index }"
            as="li"
          >
            <button
              :class="c.path === activeChallengePath ? 'text-[var(--ui-text-highlighted)] bg-neutral-100 dark:bg-neutral-800/50' : 'text-[var(--ui-text)]'"
              class="flex items-start w-full text-left p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-150"
              @click="selectChallenge(c.path)"
            >
              <UIcon
                v-if="c.icon"
                :name="c.icon"
                class="size-5 mr-3 mt-1 flex-none"
              />
              <span>
                <span class="font-semibold block">
                  {{ c.title }}
                </span>
                <p
                  class="text-base text-[var(--ui-text-muted)] mb-auto mx-auto lg:mx-0 text-left"
                >
                  {{ c.summary }}
                </p>
              </span>
            </button>
          </Motion>
        </ul>

        <div class="col-span-2 p-6 rounded-lg min-h-[300px]">
          <template v-if="activeChallenge">
            <Motion
              :key="activeChallenge.path"
              :animate="{ opacity: 1, y: 0 }"
              :initial="{ opacity: 0, y: 10 }"
              :transition="{ duration: 0.3, delay: 0.1 }"
              class="h-full"
            >
              <div
                class="h-full"
              >
                <h3
                  class="text-2xl font-bold mb-4 text-[var(--ui-text-highlighted)]"
                >
                  {{ activeChallenge.title }}
                </h3>
                <ContentRenderer
                  :value="activeChallenge.body"
                  class="prose dark:prose-invert max-w-none text-lg text-[var(--ui-text)]"
                />
              </div>
            </Motion>
          </template>
          <div
            v-else
            class="flex items-center justify-center h-full"
          >
            <p class="text-lg text-[var(--ui-text-muted)]">
              Select a challenge to see more details.
            </p>
          </div>
        </div>
      </div>
    </Motion>
  </UContainer>
  <div
    v-else
    class="text-center py-12 lg:py-20"
  >
    <p>No challenges found.</p>
  </div>
</template>
