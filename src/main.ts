import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.scss'

import './demos/ipc'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
