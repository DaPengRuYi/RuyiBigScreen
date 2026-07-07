import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './styles.css'
import { logger } from '../logs/logger'

async function enableMocking() {
  if (import.meta.env.VITE_DATA_SOURCE !== 'api') {
    const { worker } = await import('../mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
  }

  return Promise.resolve()
}

enableMocking()
  .then(() => {
    const app = createApp(App)
    app.use(createPinia())
    app.mount('#app')
    logger.info('RuyiBigScreen mounted')
  })
  .catch((error: unknown) => {
    logger.error('Failed to start application', error)
  })
