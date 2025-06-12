import { Comment, Fragment, Text, type VNode, type VNodeArrayChildren } from 'vue'

export function useSlotUtils() {
  const hasSlotContent = (nodes: Readonly<VNode[]> | VNodeArrayChildren | undefined): boolean => {
    if (!nodes) {
      return false
    }

    return nodes.some((currentNode) => {
      if (!currentNode) return false

      if (typeof currentNode === 'string') {
        return currentNode.trim().length > 0
      }

      if (typeof currentNode !== 'object' || currentNode === null) {
        return false
      }

      if (!('type' in currentNode)) return false

      const vNode = currentNode as VNode

      if (vNode.type === Comment) return false
      if (vNode.type === Text) {
        return typeof vNode.children === 'string' && vNode.children.trim().length > 0
      }
      if (vNode.type === Fragment) {
        return hasSlotContent(vNode.children as VNodeArrayChildren)
      }

      if (typeof vNode.type === 'string' || typeof vNode.type === 'object' || typeof vNode.type === 'function') {
        if (vNode.children) {
          if (typeof vNode.children === 'string') {
            return vNode.children.trim().length > 0
          }
          if (Array.isArray(vNode.children)) {
            return hasSlotContent(vNode.children as VNodeArrayChildren)
          }
          if (typeof vNode.children === 'object' && vNode.children !== null && Object.keys(vNode.children).length > 0) {
            return true
          }
        }
        return true
      }
      return false
    })
  }

  return {
    hasSlotContent
  }
}
