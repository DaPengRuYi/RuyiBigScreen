# 如意数据大屏 RuyiBigScreen

一个纯前端、教学型、可开源的数据可视化大屏项目，用于帮助学生从 0 到 1 学习 Vue 3 + ECharts 大屏开发。

## 技术栈

- Vue 3 + Vite + TypeScript
- ECharts
- Pinia
- Axios
- MSW mock
- Vitest
- Playwright
- ESLint + Prettier + Stylelint

## 数据源切换

默认使用 mock 数据：

```bash
VITE_DATA_SOURCE=mock
```

后续接入真实接口时改为：

```bash
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://your-api.example.com
```

页面组件只通过 `src/services/dashboardService.ts` 获取数据，不直接读取 mock 文件。

## 常用命令

```bash
npm run dev
npm run lint
npm run test
npm run test:e2e
npm run build
```

## 目录结构

```text
src/
  app/
  assets/
  components/
  charts/
  views/
  layouts/
  services/
  mocks/
  stores/
  utils/
  logs/
  types/
  tests/
```
