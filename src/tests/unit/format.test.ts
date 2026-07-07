import { describe, expect, it } from 'vitest'

import { formatNumber, formatPercent, formatTrend } from '../../utils/format'

describe('format utils', () => {
  it('formats numbers with Chinese locale separators', () => {
    expect(formatNumber(128936)).toBe('128,936')
  })

  it('formats percentages with one decimal place', () => {
    expect(formatPercent(98.66)).toBe('98.7%')
  })

  it('formats positive trends with plus sign', () => {
    expect(formatTrend(12.6)).toBe('+12.6%')
  })
})
