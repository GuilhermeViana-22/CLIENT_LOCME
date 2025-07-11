// src/main.js ou src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import '@/assets/css/main.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

app.mount('#app');



