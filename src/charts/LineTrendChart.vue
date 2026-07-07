<template>
  <div ref="chartRef" class="echarts" data-testid="line-trend-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { TrendPoint } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: TrendPoint[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chart) return

  chart.setOption({
    color: ['#42d8ff', '#49f2b8'],
    tooltip: { trigger: 'axis' },
    legend: {
      top: 0,
      right: 0,
      textStyle: { color: '#89a7bf' },
    },
    grid: { top: 34, right: 18, bottom: 24, left: 44 },
    xAxis: {
      type: 'category',
      data: props.data.map((item) => item.time),
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
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.16 },
        data: props.data.map((item) => item.visits),
      },
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        data: props.data.map((item) => item.orders),
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
