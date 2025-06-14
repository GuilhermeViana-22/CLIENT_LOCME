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

import SearchCard from '@/components/dashboard/SearchCard.vue';
import PlanCard from '@/components/dashboard/PlanCard.vue';
import ProfileCard from '@/components/dashboard/ProfileCard.vue';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard.vue';
import SuggestedCompanies from '@/components/dashboard/SuggestedCompanies.vue';
import RecentActivities from '@/components/dashboard/RecentActivities.vue';
import NewsCard from '@/components/dashboard/NewsCard.vue';

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
  { id: 1, type: 1, text: 'Você buscou por "Guias em SP"' },
  { id: 2, type: 2, text: 'Visualizou o perfil de EcoTur' },
  { id: 3, type: 2, text: 'Visualizou o perfil de EcoTur' },
  { id: 4, type: 1, text: 'Você buscou por "Guias em MG' },
  { id: 5, type: 2, text: 'Visualizou o perfil de EcoTur' },
  { id: 6, type: 1, text: 'Você buscou por "Guias em DF' },
  
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
