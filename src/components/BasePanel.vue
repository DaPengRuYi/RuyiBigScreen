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
    linear-gradient(135deg, rgb(69 217 255 / 13%), transparent 38%),
    linear-gradient(180deg, rgb(244 201 107 / 5%), transparent 36%),
    var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow:
    inset 0 0 28px rgb(47 117 255 / 10%),
    0 0 24px rgb(69 217 255 / 6%);
}

.base-panel > * {
  position: relative;
  z-index: 1;
}

.base-panel::before,
.base-panel::after {
  position: absolute;
  width: 34px;
  height: 34px;
  content: '';
  border-color: rgb(69 217 255 / 72%);
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

.base-panel__body::before {
  position: absolute;
  right: -8px;
  bottom: -14px;
  width: 150px;
  height: 52px;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(135deg, transparent 42%, rgb(244 201 107 / 12%) 43% 45%, transparent 46%),
    linear-gradient(45deg, transparent 47%, rgb(69 217 255 / 10%) 48% 50%, transparent 51%);
  opacity: 0.72;
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
  background: var(--gold);
  box-shadow: 0 0 14px var(--gold);
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
  text-shadow: 0 0 14px rgb(69 217 255 / 26%);
}

.base-panel__body {
  position: relative;
  z-index: 1;
  height: calc(100% - 36px);
  min-height: 0;
}
</style>
