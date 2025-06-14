<template>
  <div class="profile-container">
    <!-- Mostra o skeleton enquanto está carregando -->
    <ProfileSkeleton v-if="!authStore.user" />

    <!-- Conteúdo principal -->
    <div v-else class="container mx-auto p-4 space-y-6 md:pt-8 md:pb-8 md:mt-0 mb-16">
      <!-- Seção Superior (Desktop) -->
      <div class="md:flex md:space-x-6 md:mb-6">
        <!-- Card de Identificação -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:w-1/3">
          <div class="flex flex-col items-center">
            <div class="relative inline-block mb-4">
              <!-- Div com as iniciais -->
              <div class="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-4xl shadow-md z-1">
                {{ userInitials }}
              </div>

              <!-- Componente de avatar posicionado absolutamente -->
              <div class="absolute inset-0 flex items-center justify-center z-2">
                <ProfileAvatar :user="authStore.user" />
              </div>
            </div>

            <h2 class="text-xl font-bold text-center text-gray-800">{{ authStore.user.name || 'Nome não disponível' }}</h2>
            <p class="text-sm text-gray-500">{{ userRole }}</p>

            <div class="mt-4 flex space-x-2">
              <span class="px-3 py-1 bg-purple-100 text-primary rounded-full text-xs">
                {{ userType }}
              </span>
              <span
                  class="px-3 py-1 rounded-full text-xs"
                  :class="userStatus === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ userStatus }}
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
                <p class="font-medium">{{ authStore.user.name || 'Não disponível' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">E-mail</p>
                <p class="font-medium">{{ authStore.user.email || 'Não disponível' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Telefone</p>
                <p class="font-medium">Não disponível</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Data de Nascimento</p>
                <p class="font-medium">Não disponível</p>
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
                <p class="text-sm text-gray-500">Tipo de Perfil</p>
                <p class="font-medium">{{ userType }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Empresa</p>
                <p class="font-medium">Não disponível</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Registro Profissional</p>
                <p class="font-medium">Não disponível</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Membro desde</p>
                <p class="font-medium">{{ formattedCreatedAt }}</p>
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

      <!-- Botões de Ação -->
      <div class="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4">
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/auth.store';
import ProfileSkeleton from "@/components/ProfileSkeleton.vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";

const router = useRouter();
const authStore = useAuthStore();

// Dados padrão para estatísticas
const stats = {
  connections: 0,
  rating: 0,
  projects: 0,
  years: 0
};

// Computed properties
const userInitials = computed(() => {
  if (!authStore.user?.name) return '??';
  return authStore.user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
});

const userRole = computed(() => {
  // Você pode adicionar lógica para determinar o role se necessário
  return 'Usuário';
});

const userType = computed(() => {
  // Aqui você pode mapear o tipo_perfil_id para um texto mais amigável
  if (!authStore.user?.tipo_perfil_id) return 'Tipo não definido';

  const tipos = {
    1: 'Representante',
    2: 'Agente de viagens',
    3: 'Agência de viagens',
    4: 'Guia de turismo',
    5: 'Empresa / Entidade'
  };

  return tipos[authStore.user.tipo_perfil_id] || 'Tipo desconhecido';
});

const userStatus = computed(() => {
  return 'Ativo'; // Você pode adicionar lógica para status se necessário
});

const formattedCreatedAt = computed(() => {
  if (!authStore.user?.created_at) return 'Não disponível';

  try {
    const date = new Date(authStore.user.created_at);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return 'Não disponível';
  }
});

// Métodos
const changePassword = () => {
  router.push('/change-password');
};

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.profile-container {
  font-family: 'Poppins', sans-serif;
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