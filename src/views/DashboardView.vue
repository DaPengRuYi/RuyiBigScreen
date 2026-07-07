<template>
  <BigScreenLayout>
    <main class="dashboard-view">
      <ScreenHeader />

      <section v-if="dashboard.data" class="dashboard-view__content">
        <div class="dashboard-view__metrics">
          <MetricCard
            v-for="metric in dashboard.data.summary"
            :key="metric.id"
            :metric="metric"
            data-testid="metric-card"
          />
        </div>

        <div class="dashboard-view__grid">
          <div class="dashboard-view__left">
            <BasePanel title="访问趋势">
              <LineTrendChart :data="dashboard.data.trend" />
            </BasePanel>
            <BasePanel title="分类占比">
              <PieStatusChart :data="dashboard.data.categories" />
            </BasePanel>
          </div>

          <BasePanel title="如意数据中枢" class="dashboard-view__hub">
            <DataHubChart :data="dashboard.data.hubNodes" />
          </BasePanel>

          <div class="dashboard-view__right">
            <BasePanel title="城市访问排名">
              <BarRankingChart :data="dashboard.data.ranking" />
            </BasePanel>
            <BasePanel title="能力雷达模型">
              <RadarAbilityChart :data="dashboard.data.radar" />
            </BasePanel>
          </div>
        </div>

        <BasePanel title="实时动态与告警" class="dashboard-view__activity">
          <ul class="activity-list">
            <li
              v-for="activity in dashboard.data.activities"
              :key="activity.id"
              :class="`activity-list__item--${activity.level}`"
            >
              <span class="activity-list__time">{{ activity.time }}</span>
              <span class="activity-list__dot"></span>
              <span class="activity-list__message">{{ activity.message }}</span>
            </li>
          </ul>
        </BasePanel>
      </section>

      <section v-else class="dashboard-view__state">
        {{ dashboard.error || '数据加载中...' }}
      </section>
    </main>
  </BigScreenLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import BarRankingChart from '../charts/BarRankingChart.vue'
import LineTrendChart from '../charts/LineTrendChart.vue'
import DataHubChart from '../charts/DataHubChart.vue'
import PieStatusChart from '../charts/PieStatusChart.vue'
import RadarAbilityChart from '../charts/RadarAbilityChart.vue'
import BasePanel from '../components/BasePanel.vue'
import MetricCard from '../components/MetricCard.vue'
import ScreenHeader from '../components/ScreenHeader.vue'
import BigScreenLayout from '../layouts/BigScreenLayout.vue'
import { useDashboardStore } from '../stores/dashboardStore'

const dashboard = useDashboardStore()

onMounted(() => {
  void dashboard.loadDashboard()
})
</script>

<style scoped>
.dashboard-view {
  display: grid;
  grid-template-rows: 86px 1fr;
  width: 100%;
  height: 100%;
  color: var(--text);
}

.dashboard-view__content {
  display: grid;
  grid-template-rows: 112px 1fr 160px;
  gap: 14px;
  min-height: 0;
  padding: 14px 20px 20px;
}

.dashboard-view__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  min-height: 0;
}

.dashboard-view__grid {
  display: grid;
  grid-template-columns: 25% 1fr 25%;
  gap: 14px;
  min-height: 0;
}

.dashboard-view__left,
.dashboard-view__right {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 14px;
  min-height: 0;
}

.dashboard-view__hub {
  min-height: 0;
}

.dashboard-view__activity {
  min-height: 0;
}

.activity-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.activity-list li {
  display: grid;
  grid-template-columns: auto 8px 1fr;
  gap: 8px;
  align-items: start;
  min-width: 0;
  padding: 12px;
  background: rgb(11 36 62 / 72%);
  border: 1px solid rgb(99 208 255 / 18%);
  border-radius: 8px;
}

.activity-list__time {
  font-size: 12px;
  color: var(--cyan);
  white-space: nowrap;
}

.activity-list__dot {
  width: 8px;
  height: 8px;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 12px var(--cyan);
}

.activity-list__message {
  display: -webkit-box;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.45;
  color: #cfe9f7;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.activity-list__item--success .activity-list__dot {
  background: var(--green);
  box-shadow: 0 0 12px var(--green);
}

.activity-list__item--warning .activity-list__dot {
  background: var(--yellow);
  box-shadow: 0 0 12px var(--yellow);
}

.dashboard-view__state {
  display: grid;
  place-items: center;
  font-size: 20px;
  color: var(--muted);
}
</style>
