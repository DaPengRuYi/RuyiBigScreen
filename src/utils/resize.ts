import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useElementResize(target: Ref<HTMLElement | null>, callback: () => void) {
  let observer: ResizeObserver | undefined

  onMounted(() => {
    if (!target.value) {
      return
    }

    observer = new ResizeObserver(() => callback())
    observer.observe(target.value)
    window.addEventListener('resize', callback)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('resize', callback)
  })
}
