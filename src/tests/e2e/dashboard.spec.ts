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
    page.getByRole('heading', { name: /如意智能教学数据中心/ }),
  ).toBeVisible()
  const firstMetricCard = page.getByTestId('metric-card').first()
  await expect(firstMetricCard).toBeVisible()
  await expect(page.getByTestId('data-hub-chart')).toBeVisible()
  await expect(page.getByText('今日访问量')).toBeVisible()
  const firstSnapshot = await firstMetricCard.innerText()
  await page.waitForTimeout(2500)
  await expect(firstMetricCard).not.toHaveText(firstSnapshot)
  await expect(page.getByTestId('data-hub-chart')).toBeVisible()
  expect(consoleErrors).toEqual([])
})
