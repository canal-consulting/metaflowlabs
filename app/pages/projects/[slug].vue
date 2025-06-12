<script lang="ts" setup>
import type { BreadcrumbItem } from '#ui/types'
import type { Project, ResourceLink } from '~/types'
import { kebabCase } from 'scule'
import { slugify } from '~/utils'
import {
  computed,
  createError,
  queryCollection,
  queryCollectionItemSurroundings,
  useAsyncData,
  useRoute,
  useSeoMeta
} from '#imports'

const route = useRoute()

const { data: project, error: fetchError } = await useAsyncData<Project | null>(
  () => kebabCase(route.path),
  async () => {
    const result = await queryCollection('projects').path(route.path).first()
    return result as Project | null
  }
)

const { data: allProjects } = await useAsyncData('all-projects-for-dependency-lookup', async () => {
  const projects = await queryCollection('projects').select('title', 'path').all()
  return projects as Pick<Project, 'title' | 'path'>[] | null
})

if (fetchError.value || !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: () => project.value?.title || 'Project',
  description: () => project.value?.description || 'Project details for Metaflowlabs.'
})

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', to: '/', icon: 'i-heroicons-home-solid' },
    { label: 'Projects', to: '/projects', icon: 'i-heroicons-code-bracket-square-solid' }
  ]

  if (project.value?.title) {
    items.push({
      label: project.value.title
    })
  }
  return items
})

const dependencyLinks = computed<ResourceLink[]>(() => {
  if (project.value?.dependencies && allProjects.value) {
    return project.value.dependencies.map((depNameOrSlug) => {
      const sDep = slugify(depNameOrSlug)
      const foundProject = allProjects.value!.find((p) => {
        const pTitleSlug = slugify(p.title)
        const pPathParts = p.path.split('/')
        const pPathSegment = pPathParts.pop() || pPathParts.pop()
        const pPathSlug = pPathSegment ? slugify(pPathSegment) : ''
        return pTitleSlug === sDep || (pPathSlug && pPathSlug === sDep)
      })
      if (foundProject) {
        return {
          label: foundProject.title,
          to: foundProject.path,
          icon: 'i-heroicons-share-solid'
        }
      }
      return null
    }).filter(Boolean) as ResourceLink[]
  }
  return []
})

const { data: surround, pending: _surroundPending, error: _surroundError } = await useAsyncData(
  () => `project-surround-${route.path}`,
  () => queryCollectionItemSurroundings(
    'projects',
    route.path,
    { before: 1, after: 1, fields: ['title', 'path', 'order'] }
  ).order('order', 'ASC'),
  { watch: [() => route.path] }
)
</script>

<template>
  <UContainer
    v-if="project"
    class="py-8 lg:py-12"
  >
    <PageLayout>
      <template #breadcrumbs>
        <UBreadcrumb :items="breadcrumbs" />
      </template>
      <template #main>
        <ProjectDetailHeader :project="project" />
        <article class="prose dark:prose-invert max-w-none prose-headings:scroll-mt-24">
          <ContentRenderer
            v-if="project.body"
            :value="project"
          />
          <p v-else>
            No content available for this project yet.
          </p>

          <div
            v-if="surround && (surround[0] || surround[1])"
            class="mt-12 pt-8 border-t border-[var(--ui-border)] flex items-center justify-between gap-8 not-prose"
          >
            <UButton
              v-if="surround[0]"
              :label="surround[0].title"
              :to="surround[0].path"
              class="text-left"
              color="neutral"
              icon="i-heroicons-arrow-left-solid"
              variant="outline"
            >
              <template #label>
                <span class="block text-xs text-[var(--ui-text-muted)] mb-0.5">Previous</span>
                {{ surround[0].title }}
              </template>
            </UButton>
            <span
              v-else
              class="flex-1"
            />

            <UButton
              v-if="surround[1]"
              :label="surround[1].title"
              :to="surround[1].path"
              class="text-right"
              color="neutral"
              icon="i-heroicons-arrow-right-solid"
              trailing
              variant="outline"
            >
              <template #label>
                <span class="block text-xs text-[var(--ui-text-muted)] mb-0.5">Next</span>
                {{ surround[1].title }}
              </template>
            </UButton>
            <span
              v-else
              class="flex-1"
            />
          </div>
        </article>
      </template>

      <template #right>
        <SidebarLinkList
          v-if="project.resources && project.resources.length > 0"
          :links="project.resources"
          class="sticky top-24"
          title="Resources"
        />
        <SidebarLinkList
          v-if="dependencyLinks && dependencyLinks.length > 0"
          :links="dependencyLinks"
          class="sticky mt-8 top-24"
          title="Dependencies"
        />
      </template>
    </PageLayout>
  </UContainer>
  <div
    v-else
    class="py-8 lg:py-12 text-center"
  >
    <p>Loading project details or project not found...</p>
  </div>
</template>
