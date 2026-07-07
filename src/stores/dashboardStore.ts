import { defineStore } from 'pinia'

import { logger } from '../logs/logger'
import { fetchDashboardData } from '../services/dashboardService'
import type { DashboardData } from '../types/dashboard'

interface DashboardState {
  data: DashboardData | null
  loading: boolean
  error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    data: null,
    loading: false,
    error: null,
  }),
  actions: {
    async loadDashboard() {
      this.loading = true
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
  },
})
