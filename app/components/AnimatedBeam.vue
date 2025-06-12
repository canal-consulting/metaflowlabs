<script lang="ts" setup>
type AnimatedBeamProps = {
  class?: string
  containerRef: HTMLElement
  fromRef: HTMLElement
  toRef: HTMLElement
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

const props = withDefaults(defineProps<AnimatedBeamProps>(), {
  curvature: 0,
  reverse: false,
  duration: 3,
  delay: 0,
  pathWidth: 2,
  startXOffset: 0,
  startYOffset: 0,
  endXOffset: 0,
  endYOffset: 0
})

const id = `beam-${Math.random().toString(36).substring(2, 10)}`
const isVertical = ref(false)
const isRightToLeft = ref(false)
const isBottomToTop = ref(false)
const x1 = computed(() => {
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value
  return direction ? '90%; -10%;' : '10%; 110%;'
})
const x2 = computed(() => {
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value
  return direction ? '100%; 0%;' : '0%; 100%;'
})
const y1 = computed(() => {
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value
  return direction ? '90%; -10%;' : '10%; 110%;'
})
const y2 = computed(() => {
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value
  return direction ? '100%; 0%;' : '0%; 100%;'
})

const pathD = ref('')
const svgDimensions = ref<{ width: number, height: number }>({
  width: 0,
  height: 0
})

let resizeObserver: ResizeObserver | undefined = undefined
let stopPathUpdater: (() => void) | undefined = undefined

function updatePath() {
  const containerRect = props.containerRef.getBoundingClientRect()
  const rectA = props.fromRef.getBoundingClientRect()
  const rectB = props.toRef.getBoundingClientRect()

  const svgWidth = containerRect.width
  const svgHeight = containerRect.height
  svgDimensions.value = { width: svgWidth, height: svgHeight }

  const startX = rectA.left - containerRect.left + rectA.width / 2 + (props.startXOffset ?? 0)
  const startY = rectA.top - containerRect.top + rectA.height / 2 + (props.startYOffset ?? 0)
  const endX = rectB.left - containerRect.left + rectB.width / 2 + (props.endXOffset ?? 0)
  const endY = rectB.top - containerRect.top + rectB.height / 2 + (props.endYOffset ?? 0)

  isVertical.value = Math.abs(endY - startY) > Math.abs(endX - startX)
  isRightToLeft.value = endX < startX
  isBottomToTop.value = endY < startY

  const curvature = props.curvature ?? 0
  const controlX = (startX + endX) / 2
  const controlY = startY - curvature
  const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`
  pathD.value = d
}

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    updatePath()
  })
  resizeObserver.observe(props.containerRef)

  stopPathUpdater = watchEffect(() => {
    updatePath()
  })
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (stopPathUpdater) {
    stopPathUpdater()
  }
})
</script>

<template>
  <svg
    :height="svgDimensions.height"
    :viewBox="`0 0 ${svgDimensions.width} ${svgDimensions.height}`"
    :width="svgDimensions.width"
    class="pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="pathD"
      :stroke="pathColor"
      :stroke-opacity="pathOpacity"
      :stroke-width="pathWidth"
      class="beam-path"
      stroke-linecap="round"
    />
    <path
      :d="pathD"
      :stroke="`url(#${id})`"
      :stroke-width="pathWidth"
      class="beam-gradient-path"
      stroke-linecap="round"
      stroke-opacity="1"
    />
    <defs>
      <linearGradient
        :id
        class="beam-gradient"
        gradientUnits="userSpaceOnUse"
        x1="0%"
        x2="0%"
        y1="0%"
        y2="0%"
      >
        <stop
          :stop-color="gradientStartColor"
          offset="16.66%"
          stop-opacity="0"
        />
        <stop
          :stop-color="gradientStartColor"
          offset="32.5%"
        />
        <stop
          :stop-color="gradientStopColor"
          offset="50%"
        />
        <stop
          :stop-color="gradientStopColor"
          offset="100%"
          stop-opacity="0"
        />
        <animate
          v-if="!isVertical"
          :dur="`${duration}s`"
          :values="x1"
          attributeName="x1"
          calcMode="spline"
          keySplines="0.16 1 0.3 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
        />
        <animate
          v-if="!isVertical"
          :dur="`${duration}s`"
          :values="x2"
          attributeName="x2"
          calcMode="spline"
          keySplines="0.16 1 0.3 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
        />
        <animate
          v-if="isVertical"
          :dur="`${duration}s`"
          :values="y1"
          attributeName="y1"
          calcMode="spline"
          keySplines="0.16 1 0.3 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
        />
        <animate
          v-if="isVertical"
          :dur="`${duration}s`"
          :values="y2"
          attributeName="y2"
          calcMode="spline"
          keySplines="0.16 1 0.3 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.beam-path {
  stroke: var(--ui-beam-path-color, var(--color-error-300));
  stroke-opacity: var(--ui-beam-path-opacity, 0.8);
}

.beam-gradient stop:nth-of-type(1),
.beam-gradient stop:nth-of-type(2) {
  stop-color: var(--ui-beam-gradient-start, var(--color-error-400));
}

.beam-gradient stop:nth-of-type(3),
.beam-gradient stop:nth-of-type(4) {
  stop-color: var(--ui-beam-gradient-stop, var(--color-error-600));
}
</style>
