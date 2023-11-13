/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

// Router
import router from './router'

import { vMaska } from 'maska'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive("maska", vMaska);
registerPlugins(app)

app.mount('#app')
