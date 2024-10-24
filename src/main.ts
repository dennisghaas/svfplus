import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.scss'
import { createDeviceDetector } from "next-vue-device-detector";

const app = createApp(App)
export const device = createDeviceDetector()

app.use(router)
app.use(device).mount('#app')

const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
    loadingScreen.style.display = 'none';
}