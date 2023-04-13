import { useEffect } from 'react'

function syncScroller(targets) {
  let nodes = Array.prototype.filter.call(
    targets,
    (item) => item instanceof HTMLElement
  )

  let max = nodes.length
  if (!max || max === 1) return
  let sign = 0

  function event() {
    if (!sign) {
      sign = max - 1
      const container = nodes[0]

      let currentIndex = 0
      if (container?.children) {
        ;[...container?.children].forEach((sectionRef, index) => {
          const { offsetTop, clientHeight } = sectionRef
          if (this.scrollTop >= offsetTop - clientHeight * (1 / 5)) {
            currentIndex = index
          }
        })
      }

      for (let node of nodes) {
        // 只让右边随着左边滚动
        if (node !== this && node.id === 'right') {
          node.children?.[currentIndex]?.scrollIntoView()
        }
      }
    } else --sign
  }

  nodes.forEach((ele) => {
    ele.addEventListener('scroll', event)
  })

  return () => {
    nodes.forEach((ele) => {
      ele.removeEventListener('scroll', event)
    })
  }
}

export const useSyncScrollerEffect = (refs) => {
  useEffect(() => {
    const targets = refs.map((item) => {
      return item.current ?? item
    })
    return syncScroller(targets)
  }, [refs])
}
