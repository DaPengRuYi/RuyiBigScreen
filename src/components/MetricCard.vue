<template>
  <article class="metric-card" :class="`metric-card--${metric.status}`">
    <span class="metric-card__seal"></span>
    <div class="metric-card__label">{{ metric.label }}</div>
    <div class="metric-card__value">
      <span>{{ displayValue }}</span>
      <small>{{ metric.unit }}</small>
    </div>
    <div class="metric-card__trend">{{ formatTrend(metric.trend) }}</div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { SummaryMetric } from '../types/dashboard'
import { formatNumber, formatTrend } from '../utils/format'

const props = defineProps<{
  metric: SummaryMetric
}>()

const displayValue = computed(() =>
  props.metric.id === 'health'
    ? props.metric.value.toFixed(1)
    : formatNumber(props.metric.value),
)
</script>

<style scoped>
.metric-card {
  position: relative;
  min-width: 0;
  padding: 14px 16px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(69 217 255 / 12%), transparent 42%),
    linear-gradient(180deg, rgb(255 255 255 / 7%), transparent),
    rgb(6 25 48 / 82%);
  border: 1px solid rgb(102 217 255 / 24%);
  border-radius: 8px;
  box-shadow: inset 0 0 22px rgb(47 117 255 / 10%);
}

.metric-card__seal {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 10px;
  height: 10px;
  border: 1px solid var(--gold);
  box-shadow: 0 0 12px rgb(244 201 107 / 48%);
  transform: rotate(45deg);
}

.metric-card__label {
  overflow: hidden;
  font-size: 13px;
  color: var(--muted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-card__value {
  display: flex;
  gap: 6px;
  align-items: baseline;
  margin-top: 8px;
}

.metric-card__value span {
  overflow: hidden;
  font-size: clamp(20px, 1.8vw, 34px);
  font-weight: 800;
  line-height: 1;
  color: #f2fbff;
  text-overflow: ellipsis;
  text-shadow: 0 0 18px rgb(69 217 255 / 28%);
  white-space: nowrap;
}

.metric-card__value small,
.metric-card__trend {
  font-size: 12px;
  color: var(--muted);
}

.metric-card__trend {
  margin-top: 8px;
}

.metric-card--good .metric-card__trend {
  color: var(--green);
}

.metric-card--good {
  border-color: rgb(86 240 192 / 32%);
}

.metric-card--warning .metric-card__trend {
  color: var(--yellow);
}

.metric-card--warning {
  border-color: rgb(244 201 107 / 38%);
}

.metric-card--danger .metric-card__trend {
  color: var(--red);
}

.metric-card--danger {
  border-color: rgb(255 107 122 / 38%);
}
</style>
