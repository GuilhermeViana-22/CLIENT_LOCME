<template>
  <div class="dashboard-mobile">
    <!-- Top Bar -->
    <div class="bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="flex justify-between items-center">
        <router-link to="/dashboard">
          <i class="fas fa-arrow-left text-xl"></i>
        </router-link>
        <h1 class="text-xl font-bold">Configurações</h1>
        <div class="w-8"></div> <!-- Espaço para alinhamento -->
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-6 pt-20 pb-16">
      <!-- Card de Perfil -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4 flex items-center space-x-3 border-b">
          <div class="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-xl">
            {{ userInitials }}
          </div>
          <div>
            <h3 class="font-bold">{{ currentUser.name }}</h3>
            <p class="text-sm text-gray-500">{{ currentUser.email }}</p>
          </div>
        </div>
        <router-link 
          to="/profile"
          class="block p-3 text-center text-primary font-medium"
        >
          Ver perfil completo
        </router-link>
      </div>

      <!-- Card de Configurações Gerais -->
      <div class="bg-white rounded-lg shadow-md">
        <h3 class="p-4 text-lg font-semibold border-b">Preferências</h3>
        <div class="divide-y divide-gray-100">
          <div class="p-3 flex justify-between items-center">
            <div class="flex items-center">
              <i class="fas fa-moon text-gray-500 mr-3"></i>
              <span>Modo Escuro</span>
            </div>
            <button 
              @click="toggleDarkMode"
              class="w-12 h-6 flex items-center rounded-full p-1 transition-colors"
              :class="darkMode ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'"
            >
              <div class="w-4 h-4 rounded-full bg-white shadow"></div>
            </button>
          </div>
          <div class="p-3 flex justify-between items-center">
            <div class="flex items-center">
              <i class="fas fa-bell text-gray-500 mr-3"></i>
              <span>Notificações</span>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
          </div>
          <router-link 
            to="/settings/language"
            class="p-3 flex justify-between items-center"
          >
            <div class="flex items-center">
              <i class="fas fa-language text-gray-500 mr-3"></i>
              <span>Idioma</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">Português</span>
              <i class="fas fa-chevron-right text-gray-400"></i>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Card de Informações Técnicas -->
      <div class="bg-white rounded-lg shadow-md">
        <h3 class="p-4 text-lg font-semibold border-b">Sobre o Aplicativo</h3>
        <div class="p-4 space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-500">Versão do App</span>
            <span class="font-medium">2.3.1</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Última Atualização</span>
            <span class="font-medium">15/06/2023</span>
          </div>
          <div class="pt-3">
            <h4 class="font-medium mb-2 text-primary">Tecnologias Utilizadas</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Backend (API)</span>
                <span class="font-medium">Laravel 10.8</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Frontend</span>
                <span class="font-medium">Vue.js 3.3</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Gerenciamento de Estado</span>
                <span class="font-medium">Pinia 2.1</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Estilização</span>
                <span class="font-medium">Tailwind CSS 3.3</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Ícones</span>
                <span class="font-medium">Font Awesome 6.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card de Ações -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <button 
          @click="checkUpdates"
          class="w-full p-3 text-left flex items-center"
        >
          <i class="fas fa-sync-alt text-gray-500 mr-3"></i>
          <span>Buscar Atualizações</span>
        </button>
        <button 
          @click="showHelp"
          class="w-full p-3 text-left flex items-center border-t"
        >
          <i class="fas fa-question-circle text-gray-500 mr-3"></i>
          <span>Ajuda & Suporte</span>
        </button>
        <button 
          @click="logout"
          class="w-full p-3 text-left flex items-center border-t text-secondary"
        >
          <i class="fas fa-sign-out-alt mr-3"></i>
          <span>Sair da Conta</span>
        </button>
      </div>

      <!-- Footer -->
      <div class="text-center text-xs text-gray-500 mt-6">
        <p>TurismoConnect © 2023</p>
        <p class="mt-1">Todos os direitos reservados</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

// Dados do usuário
const currentUser = computed(() => authStore.user || {
  name: 'Carlos Silva',
  email: 'carlos@example.com'
});

// Estado das configurações
const darkMode = ref(false);
const userInitials = computed(() => {
  return currentUser.value.name.split(' ').map(n => n[0]).join('').substring(0, 2);
});

// Métodos
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  // Aqui você implementaria a lógica para mudar o tema
};

const checkUpdates = () => {
  alert('Sua aplicação está atualizada!');
  // Lógica para verificar atualizações
};

const showHelp = () => {
  router.push('/help');
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.dashboard-mobile {
  font-family: 'Poppins', sans-serif;
}

.bg-primary {
  background-color: #410179;
}

.bg-secondary {
  background-color: #ff3131;
}

.bg-accent {
  background-color: #f97316;
}

.text-primary {
  color: #410179;
}

.text-secondary {
  color: #ff3131;
}

.text-accent {
  color: #f97316;
}

/* Transição para o toggle */
button {
  transition: background-color 0.3s ease;
}
</style>