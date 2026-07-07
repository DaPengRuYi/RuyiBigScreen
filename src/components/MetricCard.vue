<template>
  <article class="metric-card" :class="`metric-card--${metric.status}`">
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
  min-width: 0;
  padding: 14px 16px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 7%), transparent), rgb(8 29 52 / 78%);
  border: 1px solid rgb(99 208 255 / 22%);
  border-radius: 8px;
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
  color: var(--text);
  text-overflow: ellipsis;
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

.metric-card--warning .metric-card__trend {
  color: var(--yellow);
}

.metric-card--danger .metric-card__trend {
  color: var(--red);
}
</style>
