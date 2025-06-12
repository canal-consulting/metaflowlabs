<script lang="ts" setup>
const steps = [
  {
    number: 1,
    title: 'Concepts',
    description: 'Brief overview of my history with Metaflow.',
    to: '/background'
  },
  {
    number: 2,
    title: 'Patterns',
    description: '',
    to: '/challenges'
  },
  {
    number: 3,
    title: 'Guides',
    description: '',
    to: '/solutions'
  }
]
</script>

<template>
  <div class="relative">
    <ul class="flex flex-col space-y-8">
      <Motion
        v-for="(step, idx) in steps"
        :key="step.number"
        :in-view-options="{ once: true }"
        :initial="{ opacity: 0, y: 10 }"
        :transition="{ delay: 0.1 * idx }"
        :while-in-view="{ opacity: 1, y: 0 }"
        as="li"
        class="relative"
      >
        <NuxtLink
          :to="step.to"
          class="flex gap-x-4 lg:pl-10 group"
        >
          <div
            class="size-8 flex items-center justify-center border border-[var(--ui-border)] rounded-full bg-[var(--ui-bg-muted)] relative"
          >
            {{ step.number }}
            <span
              v-if="idx < steps.length - 1"
              class="hidden lg:block absolute left-1/2 top-full h-[calc(100%+2rem)] -translate-x-1/2 border-l-2 border-dashed border-[var(--ui-border)]"
            />
          </div>
          <div>
            <h3 class="font-bold group-hover:underline">{{ step.title }}</h3>
            <p class="text-[var(--ui-text-muted)] text-[15px]">{{ step.description }}</p>
          </div>
        </NuxtLink>
      </Motion>
    </ul>
  </div>
</template>
