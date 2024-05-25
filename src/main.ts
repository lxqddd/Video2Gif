import { createApp } from 'vue'
import 'virtual:uno.css'

import './styles/index.scss'
import App from './App.vue'

import './demos/ipc'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
