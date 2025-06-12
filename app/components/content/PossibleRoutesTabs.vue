<script lang="ts" setup>
import type { RouteItem } from '~/types'

const { data: routesData, pending, error } = await useAsyncData<RouteItem[]>(
  'possible-routes',
  () => queryCollection('routes')
    .order('order', 'ASC')
    .order('path', 'ASC')
    .all()
)

const selectedTabIndex = ref(0)

const tabItems = computed(() => {
  if (!routesData.value) return []
  return routesData.value.map(route => ({
    label: route.title
  }))
})

const activeRouteDocument = computed(() => {
  if (!routesData.value || selectedTabIndex.value === undefined || !routesData.value[selectedTabIndex.value]) {
    return null
  }
  return routesData.value[selectedTabIndex.value]
})
</script>

<template>
  <div class="possible-routes-tabs">
    <div
      v-if="pending"
      class="py-4"
    >
      <p>Loading possible routes...</p>
    </div>
    <div
      v-else-if="error || !routesData || routesData.length === 0"
      class="py-4"
    >
      <p class="text-error-500 dark:text-error-400">
        Could not load possible routes at this time. Please check back later.
      </p>
      <pre
        v-if="error"
        class="text-xs bg-error-100 dark:bg-error-900 p-2 rounded mt-2 overflow-auto"
      >{{ error }}</pre>
    </div>
    <div v-else>
      <UTabs
        v-model="selectedTabIndex"
        :items="tabItems"
        :ui="{ trigger: 'grow' }"
      />
      <div
        v-if="activeRouteDocument"
        class="mt-6 prose dark:prose-invert max-w-none"
      >
        <ContentRenderer :value="activeRouteDocument">
          <template #empty>
            <p>Content for this route is not available.</p>
          </template>
        </ContentRenderer>
      </div>
      <div
        v-else-if="!activeRouteDocument && routesData && routesData.length > 0 && tabItems.length > 0"
        class="mt-6"
      >
        <p>Select a route to view details.</p>
      </div>
    </div>
  </div>
</template>
