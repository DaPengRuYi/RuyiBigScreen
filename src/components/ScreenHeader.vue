<template>
  <header class="screen-header">
    <div class="screen-header__side">
      <span>教学型开源项目</span>
    </div>
    <div class="screen-header__title">
      <h1>如意数据大屏 RuyiBigScreen</h1>
      <p>Vue 3 + TypeScript + ECharts 可视化实战</p>
    </div>
    <time class="screen-header__time">{{ currentTime }}</time>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

import { formatClock } from '../utils/format'

const currentTime = ref(formatClock(new Date()))
const timer = window.setInterval(() => {
  currentTime.value = formatClock(new Date())
}, 1000)

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<style scoped>
.screen-header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr minmax(360px, 720px) 1fr;
  gap: 20px;
  align-items: center;
  height: 86px;
  padding: 0 30px;
  background:
    linear-gradient(90deg, transparent, rgb(66 216 255 / 16%), transparent),
    linear-gradient(180deg, rgb(15 65 102 / 65%), transparent);
  border-bottom: 1px solid rgb(99 208 255 / 22%);
}

.screen-header__title {
  text-align: center;
}

.screen-header h1 {
  margin: 0;
  font-size: clamp(26px, 2.25vw, 42px);
  line-height: 1.12;
  letter-spacing: 0;
}

.screen-header p,
.screen-header__side,
.screen-header__time {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--muted);
}

.screen-header__side,
.screen-header__time {
  margin: 0;
}

.screen-header__time {
  justify-self: end;
  color: var(--cyan);
  white-space: nowrap;
}

@media (max-width: 900px) {
  .screen-header {
    grid-template-columns: 1fr;
    height: auto;
    padding: 16px;
    text-align: center;
  }

  .screen-header__side,
  .screen-header__time {
    justify-self: center;
  }
}
</style>
