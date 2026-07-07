<template>
  <header class="screen-header">
    <div class="screen-header__side">
      <span class="screen-header__status"></span>
      <span>教学型开源项目</span>
    </div>
    <div class="screen-header__title">
      <h1>如意智能教学数据中心</h1>
      <p>RuyiBigScreen · Vue 3 + TypeScript + ECharts 可视化实战</p>
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
    linear-gradient(90deg, transparent, rgb(69 217 255 / 18%), transparent),
    linear-gradient(180deg, rgb(13 55 91 / 74%), transparent);
  border-bottom: 1px solid rgb(102 217 255 / 24%);
}

.screen-header::before,
.screen-header::after {
  position: absolute;
  top: 50%;
  width: 28%;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, rgb(69 217 255 / 68%), transparent);
}

.screen-header::before {
  left: 30px;
}

.screen-header::after {
  right: 30px;
}

.screen-header__title {
  text-align: center;
}

.screen-header h1 {
  margin: 0;
  font-size: clamp(26px, 2.25vw, 42px);
  line-height: 1.12;
  letter-spacing: 0;
  color: #f2fbff;
  text-shadow:
    0 0 18px rgb(69 217 255 / 36%),
    0 0 34px rgb(47 117 255 / 24%);
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

.screen-header__side {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.screen-header__status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 14px var(--green);
}

.screen-header__time {
  justify-self: end;
  color: var(--gold);
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
