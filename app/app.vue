<script lang="ts" setup>
useSeoMeta({
  titleTemplate: '%s - Metaflowlabs',
  description: 'Metaflowlabs is an all-in-one development hub for Metaflow, providing in-depth guides, tutorials and reusable patterns for working with Metaflow.',
  ogImage: '/og.png'
})
</script>

<template>
  <UApp>
    <Header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
    <NuxtLoadingIndicator />
  </UApp>
</template>
