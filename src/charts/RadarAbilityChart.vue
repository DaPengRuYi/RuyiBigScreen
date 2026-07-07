<template>
  <div ref="chartRef" class="echarts" data-testid="radar-ability-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RadarData } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: RadarData
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chart) return

  chart.setOption({
    color: ['#49f2b8'],
    radar: {
      radius: '66%',
      indicator: props.data.indicators,
      axisName: { color: '#e8f7ff' },
      splitLine: { lineStyle: { color: 'rgba(137, 167, 191, 0.22)' } },
      splitArea: { areaStyle: { color: ['rgba(66, 216, 255, 0.05)'] } },
      axisLine: { lineStyle: { color: 'rgba(137, 167, 191, 0.24)' } },
    },
    series: [
      {
        name: '教学能力模型',
        type: 'radar',
        areaStyle: { opacity: 0.24 },
        lineStyle: { width: 2 },
        data: [{ value: props.data.values, name: '掌握度' }],
      },
    ],
  })
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  resizeObserver = observeResize(chartRef.value, () => chart?.resize())
  renderChart()
})

watch(() => props.data, renderChart, { deep: true })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>
