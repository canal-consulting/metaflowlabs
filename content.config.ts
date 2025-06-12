import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

// Common / Reusable Zod Schemas
const Link = z.object({
  label: z.string(),
  to: z.string(),
  icon: z.string().optional(),
  target: z.string().optional()
})

const heroLinkSchema = z.object({
  label: z.string(),
  to: z.string(),
  variant: z.enum(['primary', 'secondary', 'info']).optional()
})

const pageHeroSchema = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(heroLinkSchema).optional()
})

const faqMarkdownItemSchema = z.object({
  title: z.string(),
  category: z.string(),
  order: z.number(),
  description: z.string().optional()

})

const challengeMarkdownSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  summary: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().optional()
})

const landingSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string()
})

// Common schema for learn pages
const commonLearnPageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  navigationTitle: z.string().optional(),
  order: z.number().optional(),
  surround: z.boolean().optional()
})

// Collection Definitions
const projectsCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: '2.projects/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    phase: z.string(),
    category: z.array(z.string()).optional(),
    resources: z.array(Link).optional(),
    dependencies: z.array(z.string()).optional(),
    order: z.number().optional()
  })
}))

const projectsLandingCollection = defineCollection({
  type: 'data',
  source: '2.projects/*.yml',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    phase: z.string().optional(),
    category: z.array(z.string()).optional()
  })
})

const learnCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: '1.learn/**/*.{md,yml}',
  schema: commonLearnPageSchema
}))

const landingPageCollection = defineCollection({
  type: 'data',
  source: 'landing.yml',
  schema: z.object({
    hero: pageHeroSchema,
    sections: z.array(landingSectionSchema).optional()
  })
})

// FAQ Collection
const faqCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: 'faq/**/*.md',
  schema: faqMarkdownItemSchema
}))

// Challenges Collection
const challengesCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: 'challenges/**/*.md',
  schema: challengeMarkdownSchema
}))

// Collection for Proposal Page
const proposalPageCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: 'proposal.md',
  schema: z.object({
    title: z.string({ message: 'Proposal page title is required.' }),
    description: z.string().optional()
  })
}))

// Collection for Proposal Page Routes/Tabs
const routesCollection = defineCollection(asSeoCollection({
  type: 'page',
  source: 'routes/*.md',
  schema: z.object({
    title: z.string({ required_error: 'Route title is required.' }),
    description: z.string().optional(),
    order: z.number().optional()
  })
}))

export default defineContentConfig({
  collections: {
    projects: projectsCollection,
    projectsLanding: projectsLandingCollection,
    learn: learnCollection,
    landingPage: landingPageCollection,
    faq: faqCollection,
    challenges: challengesCollection,
    proposalPage: proposalPageCollection,
    routes: routesCollection
  }
})
