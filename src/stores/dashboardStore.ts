import { defineStore } from 'pinia'

import { logger } from '../logs/logger'
import { fetchDashboardData } from '../services/dashboardService'
import type { DashboardData } from '../types/dashboard'

interface DashboardState {
  data: DashboardData | null
  loading: boolean
  error: string | null
  realtimeTimer: ReturnType<typeof window.setInterval> | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    data: null,
    loading: false,
    error: null,
    realtimeTimer: null,
  }),
  actions: {
    async loadDashboard(options: { silent?: boolean } = {}) {
      if (!options.silent) {
        this.loading = true
      }
      this.error = null

      try {
        this.data = await fetchDashboardData()
        logger.info('Dashboard data loaded', this.data.updatedAt)
      } catch (error) {
        this.error = '数据加载失败'
        logger.error('Dashboard data load failed', error)
      } finally {
        this.loading = false
      }
    },
    startRealtime() {
      if (this.realtimeTimer) return

      void this.loadDashboard()
      this.realtimeTimer = window.setInterval(() => {
        void this.loadDashboard({ silent: true })
      }, 2000)
    },
    stopRealtime() {
      if (!this.realtimeTimer) return

      window.clearInterval(this.realtimeTimer)
      this.realtimeTimer = null
    },
  },
})
