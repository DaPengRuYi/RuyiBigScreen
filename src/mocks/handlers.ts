import { http, HttpResponse } from 'msw'

import { nextDashboardFrame } from './realtimeDashboardSimulator'

export const handlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json(nextDashboardFrame())
  }),
]
