import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import footer from './components/footer.vue'
const routes = [{
    path: '/footer',
    component: footer
}];
const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App).use(router).mount('#app')