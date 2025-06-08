<template>
  <div class="profile-container">

    <!-- Mostra o skeleton enquanto está carregando -->
    <ProfileSkeleton v-if="isLoading" />

    <!-- Conteúdo principal -->
    <div v-else class="container mx-auto p-4 space-y-6 md:pt-8 md:pb-8 md:mt-0 mb-16">
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import users from "@/services/users/users.js";
import ProfileSkeleton from "@/components/ProfileSkeleton.vue";

const route = useRoute();
const router = useRouter();

// Dados reativos
const user = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  role: '',
  type: '',
  status: '',
  company: '',
  registration: '',
  since: ''
});

const stats = ref({
  connections: 0,
  rating: 0,
  projects: 0,
  years: 0
});

const isLoading = ref(true);
const error = ref(null);

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

// Função para carregar dados do usuário
const fetchUserData = async () => {
  try {
    isLoading.value = true;
    const userData = await users.getMe();

    console.log(userData)

    // Atualiza os dados do usuário
    user.value = {
      name: userData.name || 'Nome não disponível',
      email: userData.email || 'Não informado',
      phone: userData.telefone_celular || 'Não informado',
      birthDate: userData.data_nascimento || 'Não informado',
      role: userData.cargo_funcao || 'Não informado',
      type: userData.type || 'Não informado',
      status: userData.status || 'Não informado',
      company: userData.empresa_atual || 'Não informado',
      registration: userData.registration || 'Não informado',
      since: userData.created_at || 'Não informado'
    };

    // Atualiza as estatísticas (pode vir da API também)
    stats.value = {
      connections: userData.connections || 0,
      rating: userData.rating || 0,
      projects: userData.projects || 0,
      years: userData.years || 0
    };
  } catch (err) {
    error.value = 'Erro ao carregar dados do usuário';
    console.error('Erro:', err);
  } finally {
    isLoading.value = false;
  }
};

// Carrega os dados quando o componente é montado
onMounted(fetchUserData);
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