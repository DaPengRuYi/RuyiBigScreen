export interface SummaryMetric {
  key: string
  label: string
  value: number
  unit: string
  trend: number
  status: 'up' | 'down' | 'stable'
}

export interface TrendPoint {
  time: string
  visits: number
  orders: number
}

export interface CategoryDistribution {
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

export interface MapNode {
  name: string
  value: number
  x: number
  y: number
  level: 'core' | 'hot' | 'normal'
}

export interface ActivityItem {
  id: string
  time: string
  type: 'info' | 'warning' | 'success'
  title: string
  location: string
}

export interface DashboardData {
  summary: SummaryMetric[]
  trend: TrendPoint[]
  categories: CategoryDistribution[]
  ranking: RankingItem[]
  radar: RadarData
  mapNodes: MapNode[]
  activities: ActivityItem[]
}
