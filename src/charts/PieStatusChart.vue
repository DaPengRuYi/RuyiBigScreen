<template>
  <div ref="chartRef" class="echarts" data-testid="pie-status-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { CategoryItem } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: CategoryItem[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chart) return

  chart.setOption({
    color: ['#42d8ff', '#49f2b8', '#ffd166', '#ff8e72', '#8a7dff'],
    tooltip: { trigger: 'item' },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'middle',
      textStyle: { color: '#89a7bf' },
    },
    series: [
      {
        name: '分类占比',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['38%', '52%'],
        avoidLabelOverlap: true,
        label: { color: '#e8f7ff', formatter: '{b}\n{d}%' },
        labelLine: { lineStyle: { color: '#5e7f99' } },
        data: props.data,
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
