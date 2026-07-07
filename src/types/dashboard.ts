export interface SummaryMetric {
  id: string
  label: string
  value: number
  unit: string
  trend: number
  status: 'good' | 'warning' | 'danger'
}

export interface TrendPoint {
  time: string
  visits: number
  orders: number
}

export interface CategoryItem {
  name: string
  value: number
}

export interface RankingItem {
  city: string
  value: number
}

export interface RadarIndicator {
  name: string
  max: number
}

export interface RadarData {
  indicators: RadarIndicator[]
  values: number[]
}

export interface ActivityItem {
  id: string
  time: string
  level: 'info' | 'warning' | 'success'
  message: string
}

export interface HubNode {
  id: string
  name: string
  value: number
  coord: [number, number]
  status: 'good' | 'warning' | 'danger'
  description: string
}

export interface DashboardData {
  updatedAt: string
  summary: SummaryMetric[]
  trend: TrendPoint[]
  categories: CategoryItem[]
  ranking: RankingItem[]
  radar: RadarData
  activities: ActivityItem[]
  hubNodes: HubNode[]
}
