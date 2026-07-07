import { expect, test } from '@playwright/test'

test('renders the RuyiBigScreen dashboard', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /如意数据大屏 RuyiBigScreen/ }),
  ).toBeVisible()
  await expect(page.getByTestId('metric-card').first()).toBeVisible()
  await expect(page.getByTestId('map-overview-chart')).toBeVisible()
  await expect(page.getByText('今日访问量')).toBeVisible()
  expect(consoleErrors).toEqual([])
})
