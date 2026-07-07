# RuyiBigScreen

如意数据大屏是一个公开开源的教学型数据可视化大屏项目，目标是帮助学生和初学者从 0 到 1 学习如何自己动手制作一个完整的数据可视化大屏。

## 技术栈

- Vue 3 + Vite + TypeScript
- ECharts
- Pinia
- Axios
- MSW mock
- Vitest
- Playwright
- ESLint + Prettier + Stylelint

## 本地运行

```bash
npm install
npm run dev
```

默认使用 mock 数据。后续接入真实 API 时，可以设置：

```bash
VITE_DATA_SOURCE=api
```

## 常用命令

```bash
npm run lint
npm run format
npm run test
npm run test:e2e
npm run build
```

## 项目定位

这个项目当前阶段只实现纯前端，所有页面数据都通过 services 层获取。默认 mock 模式下读取本地模拟数据；切换到 api 模式后，会通过 Axios 访问预留接口，方便后续平滑接入后端。
