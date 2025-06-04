<template>
  <div class="dashboard-mobile">
    <!-- Top Bar -->
    <div class="bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="flex justify-between items-center">
        <router-link to="/dashboard">
          <i class="fas fa-arrow-left text-xl"></i>
        </router-link>
        <h1 class="text-xl font-bold">Meu Perfil</h1>
        <router-link to="/profile/edit">
          <i class="fas fa-edit text-xl"></i>
        </router-link>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-6 pt-20 pb-16">
      <!-- Card de Identificação -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white text-3xl mb-4">
            {{ userInitials }}
          </div>
          <h2 class="text-xl font-bold text-center text-gray-800">{{ user.name }}</h2>
          <p class="text-sm text-gray-500">{{ user.role }}</p>
          
          <div class="mt-4 flex space-x-2">
            <span class="px-3 py-1 bg-purple-100 text-primary rounded-full text-xs">
              {{ user.type }}
            </span>
            <span 
              class="px-3 py-1 rounded-full text-xs"
              :class="user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
            >
              {{ user.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Card de Informações Pessoais -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
          <i class="fas fa-user-circle mr-2"></i>
          Informações Pessoais
        </h3>
        
        <div class="space-y-3">
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">Nome Completo</span>
            <span class="font-medium">{{ user.name }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">E-mail</span>
            <span class="font-medium">{{ user.email }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">Telefone</span>
            <span class="font-medium">{{ user.phone || 'Não cadastrado' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Data de Nascimento</span>
            <span class="font-medium">{{ user.birthDate || 'Não cadastrada' }}</span>
          </div>
        </div>
      </div>

      <!-- Card de Informações Profissionais -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
          <i class="fas fa-briefcase mr-2"></i>
          Informações Profissionais
        </h3>
        
        <div class="space-y-3">
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">Cargo/Função</span>
            <span class="font-medium">{{ user.role }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">Empresa</span>
            <span class="font-medium">{{ user.company || 'Não cadastrada' }}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="text-gray-500">Registro Profissional</span>
            <span class="font-medium">{{ user.registration || 'Não cadastrado' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Desde</span>
            <span class="font-medium">{{ user.since || 'Não informado' }}</span>
          </div>
        </div>
      </div>

      <!-- Card de Estatísticas -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
          <i class="fas fa-chart-line mr-2"></i>
          Estatísticas
        </h3>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-purple-50 p-3 rounded-lg text-center">
            <p class="text-sm text-gray-500">Conexões</p>
            <p class="text-xl font-bold text-primary">{{ stats.connections }}</p>
          </div>
          <div class="bg-orange-50 p-3 rounded-lg text-center">
            <p class="text-sm text-gray-500">Avaliação</p>
            <div class="flex justify-center items-center">
              <p class="text-xl font-bold text-accent mr-1">{{ stats.rating }}</p>
              <i class="fas fa-star text-yellow-400"></i>
            </div>
          </div>
          <div class="bg-green-50 p-3 rounded-lg text-center">
            <p class="text-sm text-gray-500">Projetos</p>
            <p class="text-xl font-bold text-green-600">{{ stats.projects }}</p>
          </div>
          <div class="bg-blue-50 p-3 rounded-lg text-center">
            <p class="text-sm text-gray-500">Anos</p>
            <p class="text-xl font-bold text-blue-600">{{ stats.years }}</p>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="grid grid-cols-2 gap-3">
        <button 
          @click="changePassword"
          class="py-3 px-4 border border-primary rounded-md text-sm font-medium text-primary bg-white hover:bg-purple-50"
        >
          Alterar Senha
        </button>
        <button 
          @click="logout"
          class="py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-secondary hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dados mockados do usuário
const user = ref({
  name: 'Carlos Eduardo Silva',
  email: 'carlos.silva@example.com',
  phone: '(11) 98765-4321',
  birthDate: '15/05/1985',
  role: 'Guia de Turismo Especializado',
  type: 'Premium',
  status: 'Ativo',
  company: 'EcoTur Viagens',
  registration: 'REG-123456',
  since: '2018'
});

// Estatísticas mockadas
const stats = ref({
  connections: 142,
  rating: 4.8,
  projects: 67,
  years: 5
});

// Computed property para iniciais
const userInitials = computed(() => {
  return user.value.name.split(' ').map(n => n[0]).join('').substring(0, 2);
});

// Métodos
const changePassword = () => {
  router.push('/change-password');
};

const logout = () => {
  console.log('Usuário deslogado');
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
</style>