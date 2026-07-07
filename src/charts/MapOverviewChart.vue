<template>
  <div ref="chartRef" class="echarts" data-testid="map-overview-chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { MapNode } from '../types/dashboard'
import { observeResize } from '../utils/resize'

const props = defineProps<{
  data: MapNode[]
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chart) return

  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value }: { name: string; value: number[] }) =>
        `${name}<br />活跃度 ${value[2]}`,
    },
    grid: { top: 16, right: 16, bottom: 16, left: 16 },
    xAxis: { min: 0, max: 100, show: false },
    yAxis: { min: 0, max: 100, show: false },
    series: [
      {
        name: '网络底图',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: false,
        lineStyle: { color: 'rgba(66, 216, 255, 0.22)', width: 1 },
        data: props.data.slice(1).map((node) => ({
          coords: [[50, 50], node.coord],
        })),
        silent: true,
      },
      {
        name: '态势节点',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        rippleEffect: { scale: 4, brushType: 'stroke' },
        symbolSize: (value: number[]) => Math.max(12, value[2] / 3),
        itemStyle: { color: '#42d8ff', shadowBlur: 18, shadowColor: '#42d8ff' },
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          color: '#e8f7ff',
        },
        data: props.data.map((node) => ({
          name: node.name,
          value: [...node.coord, node.value],
        })),
      },
      {
        name: '中心枢纽',
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        symbolSize: 28,
        itemStyle: { color: '#49f2b8', shadowBlur: 24, shadowColor: '#49f2b8' },
        label: {
          show: true,
          formatter: '如意数据中心',
          position: 'bottom',
          color: '#49f2b8',
        },
        data: [[50, 50, 100]],
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
