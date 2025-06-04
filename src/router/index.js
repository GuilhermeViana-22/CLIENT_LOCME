import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';


const routes = [
  { path: '/', name: 'home', component: Home }, // Nome da rota para facilitar a navegação programática
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
