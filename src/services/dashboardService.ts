import { nextDashboardFrame } from '../mocks/realtimeDashboardSimulator'
import type { DashboardData } from '../types/dashboard'
import { getDataSource } from './dataSource'
import { httpClient } from './http'

export async function fetchDashboardData(): Promise<DashboardData> {
  if (getDataSource() === 'mock') {
    return Promise.resolve(nextDashboardFrame())
  }

  const response = await httpClient.get<DashboardData>('/dashboard')
  return response.data
}
