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
  await expect(page.getByTestId('metric-card').first()).toBeVisible()
  await expect(page.getByTestId('data-hub-chart')).toBeVisible()
  await expect(page.getByText('今日访问量')).toBeVisible()
  expect(consoleErrors).toEqual([])
})
