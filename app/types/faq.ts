export interface MarkdownAST {
  type: string
  children?: any
}

export interface FaqMarkdownItem {
  title: string
  category: string
  order: number
  body: MarkdownAST
  path: string
  description?: string
}

export interface FaqDisplayItem {
  label: string
  document: FaqMarkdownItem
  slot: 'renderFaqContent'
}

export interface FaqDisplayCategory {
  label: string
  key: string
  questions: FaqDisplayItem[]
  _sortKey: string
}
