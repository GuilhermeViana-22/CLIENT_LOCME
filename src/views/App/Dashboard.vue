<template>
  <div class="dashboard-mobile">
    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-4 pb-16">
      <div class="md:hidden block">
        <SearchCard />
      </div>
      
      <section class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <PlanCard :userPlan="userPlan" />
        <ProfileCard :user="currentUser" />
      </section>
      
       <section class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <QuickActionsCard />
        <RecentActivities :activities="recentActivities" />
      </section>

      <SuggestedCompanies :companies="suggestedCompanies" />
      
      <NewsCard :articles="newsArticles" />
    </div>

    <!-- Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import SearchCard from '@/components/SearchCard.vue';
import PlanCard from '@/components/PlanCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import QuickActionsCard from '@/components/QuickActionsCard.vue';
import SuggestedCompanies from '@/components/SuggestedCompanies.vue';
import RecentActivities from '@/components/RecentActivities.vue';
import NewsCard from '@/components/NewsCard.vue';

const currentUser = ref({
  name: 'Carlos Silva',
  role: 'Guia de Turismo',
  company: 'RioTur Viagens',
  plan: 'RO'
});

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
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' },
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' },
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' },
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' },
  { id: 2, type: 'view', text: 'Visualizou o perfil de EcoTur' },
  
]);

const newsArticles = ref([
  { id: 1, title: 'Como destacar seu perfil', preview: 'Dicas para se destacar na plataforma...' },
  { id: 2, title: 'Tendências 2023', preview: 'O que os turistas estão buscando...' }
]);

</script>

<style scoped>
.dashboard-mobile {
  font-family: 'Inter', sans-serif;
}
</style>
