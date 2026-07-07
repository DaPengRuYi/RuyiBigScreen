export function observeResize(target: HTMLElement, callback: () => void): ResizeObserver {
  const observer = new ResizeObserver(() => callback())
  observer.observe(target)
  return observer
}
