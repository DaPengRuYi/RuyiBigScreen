<template>
  <div ref="chartRef" class="echarts" data-testid="bar-ranking-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { RankingItem } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: RankingItem[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chart) return

  chart.setOption({
    color: ['#3d7cff'],
    tooltip: { trigger: 'axis' },
    grid: { top: 16, right: 22, bottom: 24, left: 48 },
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.city),
      axisLine: { lineStyle: { color: '#31506a' } },
      axisLabel: { color: '#89a7bf' },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(137, 167, 191, 0.16)' } },
      axisLabel: { color: '#89a7bf' },
    },
    series: [
      {
        name: '访问量',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#49f2b8' },
            { offset: 1, color: '#3d7cff' },
          ]),
        },
        data: props.data.map((item) => item.value),
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
