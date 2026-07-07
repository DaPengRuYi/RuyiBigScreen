<template>
  <section class="base-panel" :aria-label="title">
    <header class="base-panel__header">
      <span class="base-panel__mark"></span>
      <h2>{{ title }}</h2>
      <slot name="extra" />
    </header>
    <div class="base-panel__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.base-panel {
  position: relative;
  min-height: 0;
  padding: 14px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(66 216 255 / 9%), transparent 36%), var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: inset 0 0 24px rgb(61 124 255 / 8%);
}

.base-panel::before,
.base-panel::after {
  position: absolute;
  width: 28px;
  height: 28px;
  content: '';
  border-color: rgb(66 216 255 / 62%);
}

.base-panel::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.base-panel::after {
  right: -1px;
  bottom: -1px;
  border-right: 2px solid;
  border-bottom: 2px solid;
}

.base-panel__header {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 28px;
  margin-bottom: 8px;
}

.base-panel__mark {
  width: 8px;
  height: 8px;
  background: var(--green);
  box-shadow: 0 0 14px var(--green);
  transform: rotate(45deg);
}

.base-panel h2 {
  flex: 1;
  margin: 0;
  overflow: hidden;
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-panel__body {
  position: relative;
  z-index: 1;
  height: calc(100% - 36px);
  min-height: 0;
}
</style>
