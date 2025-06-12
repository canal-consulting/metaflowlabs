export interface ResourceLink {
  label: string
  to: string
  icon?: string
  target?: string
}

export interface Project {
  title: string
  description: string
  path: string
  icon?: string
  phase: string
  category?: string[]
  resources?: ResourceLink[]
  dependencies?: string[]
  body?: any
}
