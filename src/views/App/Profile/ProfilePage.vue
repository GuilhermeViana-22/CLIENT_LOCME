<template>
  <div class="profile-container">

    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-6 md:pt-8 md:pb-8 md:mt-0 mb-16">
      <!-- Seção Superior (Desktop) -->
      <div class="md:flex md:space-x-6 md:mb-6">
        <!-- Card de Identificação -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:w-1/3">
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-4xl mb-4 shadow-md">
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

          <!-- Estatísticas (Desktop) -->
          <div class="mt-8 grid grid-cols-2 gap-3">
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
          </div>
        </div>

        <!-- Seção Direita (Desktop) -->
        <div class="md:flex-1 md:space-y-6">
          <!-- Card de Informações Pessoais -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6 md:mt-0">
            <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
              <i class="fas fa-user-circle mr-2"></i>
              Informações Pessoais
            </h3>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Nome Completo</p>
                <p class="font-medium">{{ user.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">E-mail</p>
                <p class="font-medium">{{ user.email }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Telefone</p>
                <p class="font-medium">{{ user.phone || 'Não cadastrado' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Data de Nascimento</p>
                <p class="font-medium">{{ user.birthDate || 'Não cadastrada' }}</p>
              </div>
            </div>
          </div>

          <!-- Card de Informações Profissionais -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
              <i class="fas fa-briefcase mr-2"></i>
              Informações Profissionais
            </h3>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Cargo/Função</p>
                <p class="font-medium">{{ user.role }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Empresa</p>
                <p class="font-medium">{{ user.company || 'Não cadastrada' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Registro Profissional</p>
                <p class="font-medium">{{ user.registration || 'Não cadastrado' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Desde</p>
                <p class="font-medium">{{ user.since || 'Não informado' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card de Estatísticas (Mobile) -->
      <div class="md:hidden bg-white rounded-xl shadow-lg p-6">
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

      <!-- Botões de Ação (Mobile) -->
      <div class="md:hidden grid grid-cols-2 gap-3">
        <button
            @click="changePassword"
            class="py-3 px-4 border border-primary rounded-md text-sm font-medium text-primary bg-white hover:bg-purple-50"
        >
          Editar Perfil
        </button>
        <button
            @click="changePassword"
            class="py-3 px-4 border border-primary rounded-md text-sm font-medium text-primary bg-white hover:bg-purple-50"
        >
          Alterar Senha
        </button>
      </div>

      <!-- Botões de Ação (Desktop) -->
      <div class="hidden md:flex justify-end space-x-4">
        <button
            @click="changePassword"
            class="px-6 py-2 border border-primary rounded-lg font-medium text-primary bg-white hover:bg-purple-50 transition-colors"
        >
          Editar Perfil
        </button>
        <button
            @click="changePassword"
            class="px-6 py-2 border border-primary rounded-lg font-medium text-primary bg-white hover:bg-purple-50 transition-colors"
        >
          Alterar Senha
        </button>
        <button
            @click="logout"
            class="px-6 py-2 border border-transparent rounded-lg font-medium text-white bg-secondary hover:bg-red-700 transition-colors"
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
.profile-container {
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

/* Transições suaves para hover */
button, a {
  transition: all 0.2s ease;
}

/* Melhoria na legibilidade */
p, span {
  line-height: 1.5;
}
</style>