import { describe, expect, it } from 'vitest'

import { fetchDashboardData } from '../../services/dashboardService'

describe('dashboardService', () => {
  it('returns dashboard data in mock mode', async () => {
    const data = await fetchDashboardData()

    expect(data.summary.length).toBeGreaterThan(0)
    expect(data.trend.length).toBeGreaterThan(0)
    expect(data.activities.length).toBeGreaterThan(0)
  })
})
