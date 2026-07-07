import { describe, expect, it } from 'vitest'

import {
  nextDashboardFrame,
  resetRealtimeDashboardSimulator,
} from '../../mocks/realtimeDashboardSimulator'
import { fetchDashboardData } from '../../services/dashboardService'

describe('dashboardService', () => {
  it('returns dashboard data in mock mode', async () => {
    const data = await fetchDashboardData()

    expect(data.summary.length).toBeGreaterThan(0)
    expect(data.trend.length).toBeGreaterThan(0)
    expect(data.activities.length).toBeGreaterThan(0)
  })

  it('returns changing realtime mock frames', async () => {
    resetRealtimeDashboardSimulator()

    const firstFrame = await fetchDashboardData()
    const secondFrame = await fetchDashboardData()

    expect(secondFrame.updatedAt).not.toBe(firstFrame.updatedAt)
    expect(secondFrame.summary[0].value).toBeGreaterThan(firstFrame.summary[0].value)
  })
})

describe('realtimeDashboardSimulator', () => {
  it('keeps generated dashboard data inside teaching demo bounds', () => {
    resetRealtimeDashboardSimulator()

    let frame = nextDashboardFrame()
    for (let index = 0; index < 24; index += 1) {
      frame = nextDashboardFrame()
    }

    const categoryTotal = frame.categories.reduce((sum, item) => sum + item.value, 0)

    expect(frame.trend.length).toBeGreaterThanOrEqual(8)
    expect(frame.trend.length).toBeLessThanOrEqual(10)
    expect(frame.activities.length).toBeLessThanOrEqual(8)
    expect(categoryTotal).toBe(100)
    expect(frame.hubNodes.every((node) => node.value >= 40 && node.value <= 100)).toBe(true)
  })
})
