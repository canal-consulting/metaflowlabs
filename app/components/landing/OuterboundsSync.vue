<script lang="ts" setup>
const containerRef = ref<HTMLElement | null>(null)
const div1Ref = ref<HTMLElement | null>(null)
const div2Ref = ref<HTMLElement | null>(null)
</script>

<template>
  <ClientOnly>
    <div
      ref="containerRef"
      class="relative flex w-full items-center justify-center overflow-hidden p-5"
    >
      <div class="flex size-full flex-col items-stretch justify-between">
        <div class="flex flex-row justify-between">
          <div
            ref="div1Ref"
            class="z-10 flex items-center justify-center text-center"
          >
            <span class="animated-gradient-text font-bold text-base sm:text-lg">Metaflowlabs</span>
          </div>
          <div
            ref="div2Ref"
            class="z-10 flex items-center justify-center text-center"
          >
            <span class="animated-gradient-text font-bold text-base sm:text-lg">Outerbounds</span>
          </div>
        </div>
      </div>

      <AnimatedBeam
        v-if="containerRef && div1Ref && div2Ref"
        :container-ref="containerRef"
        :curvature="-65"
        :end-x-offset="-60"
        :from-ref="div1Ref"
        :start-x-offset="62"
        :to-ref="div2Ref"
      />
      <AnimatedBeam
        v-if="containerRef && div1Ref && div2Ref"
        :container-ref="containerRef"
        :curvature="65"
        :end-x-offset="-60"
        :from-ref="div1Ref"
        :reverse="true"
        :start-x-offset="62"
        :to-ref="div2Ref"
      />
    </div>
  </ClientOnly>
</template>
