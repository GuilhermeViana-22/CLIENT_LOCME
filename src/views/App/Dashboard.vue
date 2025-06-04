<!-- src/components/DashboardMobile.vue -->
<template>
  <div class="dashboard-mobile">
    <!-- Top Bar -->
    <div class="bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <i class="fas fa-bars text-xl" @click="toggleSidebar"></i>
        </div>
        <h1 class="text-xl font-bold">LocME</h1>
        <div class="flex items-center space-x-4">
          <i class="fas fa-bell text-xl"></i>
          <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <i class="fas fa-user text-white"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-4 pt-20 pb-16">
      <!-- Card de Busca -->
      <SearchCard />

      <!-- Card de Destaque (Plano Atual) -->
      <PlanCard :userPlan="userPlan" />

      <!-- Card de Perfil Rápido -->
      <ProfileCard :user="currentUser" />

      <!-- Card de Ações Rápidas -->
      <QuickActionsCard />

      <!-- Card de Empresas Sugeridas -->
      <SuggestedCompanies :companies="suggestedCompanies" />

      <!-- Card de Atividades Recentes -->
      <RecentActivities :activities="recentActivities" />

      <!-- Card de Notícias/Blog -->
      <NewsCard :articles="newsArticles" />
    </div>

    <!-- Sidebar -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="toggleSidebar"></div>
    <div v-if="sidebarOpen" class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform">
      <!-- Conteúdo do sidebar -->
      <div class="p-4">
        <h2 class="text-lg font-bold text-primary mb-4">Menu</h2>
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.name" class="p-2 hover:bg-purple-50 rounded">
            <a :href="item.link" class="flex items-center text-gray-700">
              <i :class="`fas fa-${item.icon} mr-2`"></i>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Componentes filhos
import SearchCard from '@/components/SearchCard.vue';
import PlanCard from '@/components/PlanCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import QuickActionsCard from '@/components/QuickActionsCard.vue';
import SuggestedCompanies from '@/components/SuggestedCompanies.vue';
import RecentActivities from '@/components/RecentActivities.vue';
import NewsCard from '@/components/NewsCard.vue';

// Estado do componente
const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Dados do usuário
const currentUser = ref({
  name: 'Carlos Silva',
  role: 'Guia de Turismo',
  company: 'RioTur Viagens',
  plan: 'RO'
});

// Dados mockados
const userPlan = ref({
  type: 'RO',
  progress: 45,
  message: 'Você está nos 100 primeiros'
});

const suggestedCompanies = ref([
  { id: 1, name: 'EcoTur', type: 'Agência', icon: 'building' },
  { id: 2, name: 'Maria Souza', type: 'Guia', icon: 'user-tie' },
  { id: 3, name: 'Pousada Sol', type: 'Hospedagem', icon: 'hotel' }
]);

const recentActivities = ref([
  { id: 1, type: 'search', text: 'Você buscou por "Guias em SP"' },
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' }
]);

const newsArticles = ref([
  { id: 1, title: 'Como destacar seu perfil', preview: 'Dicas para se destacar na plataforma...' },
  { id: 2, title: 'Tendências 2023', preview: 'O que os turistas estão buscando...' }
]);

const menuItems = ref([
  { name: 'Início', icon: 'home', link: 'dashboard' },
  { name: 'Perfil', icon: 'user', link: '/profile' },
  { name: 'Usuarios', icon: 'envelope', link: 'usuarios' },
  { name: 'Configurações', icon: 'cog', link: 'settings' },
  { name: 'Ajuda', icon: 'question-circle', link: '#' }
]);
</script>

<style scoped>
.dashboard-mobile {
  font-family: 'Inter', sans-serif;
}
</style>