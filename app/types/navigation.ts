import type { RouteLocationRaw } from 'vue-router'

export interface ContentPageInfo {
  title: string
  description?: string
  navigationTitle?: string
  order?: number
  titleTemplate?: string
  surround?: boolean

  path: string
  stem?: string
  body?: any
  navigation?: boolean | {
    title: string
    description?: string
    icon?: string
  }

}

export interface NavLink {
  label: string
  to?: RouteLocationRaw
  icon?: string
  target?: string
  rel?: string
  active?: boolean
  description?: string
  children?: NavLink[]
  slot?: string
  type?: 'label' | 'link'
}
