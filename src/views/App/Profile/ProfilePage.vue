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
            <ProfileAvatarCompact :user="authStore.user" editable />

            <h2 class="text-xl font-bold text-center text-gray-800">{{ authStore.user.name || 'Nome não disponível' }}</h2>

            <div class="mt-4 flex space-x-2">
              <span class="px-3 py-1 bg-purple-100 text-primary rounded-full text-xs">
                {{ authStore.user.tipo_perfil || 'Não disponível' }}
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

          <TextArea
              id="bio"
              label="Biografia"
              v-model="form.bio"
              rows="6"
              placeholder="Digite sua biografia aqui..."
              class="w-full mt-12 p-2"
              :view-mode="true"
          />
        </div>

        <!-- Seção Direita (Desktop) -->
        <div class="md:flex-1 md:space-y-6">
          <!-- Card de Informações Pessoais -->
          <div class="bg-white rounded-xl shadow-lg p-6 mt-6 md:mt-0">

            <div class="flex justify-between">
              <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
                <i class="fas fa-user-circle mr-2"></i>
                Informações Pessoais
              </h3>

              <button
                  @click="refreshProfile"
                  :disabled="isRefreshing"
                  class="flex items-center gap-2 px-6 py-2.5 border border-primary rounded-lg font-medium text-primary bg-white hover:bg-purple-50 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg
                    v-if="isRefreshing"
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span class="lg:block hidden">{{ isRefreshing ? 'Recarregando...' : 'Recarregar Perfil' }}</span>
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Usuário</p>
                <p class="font-medium">{{ authStore.user.name || 'Não disponível' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">E-mail</p>
                <p class="font-medium">{{ authStore.user.email || 'Não disponível' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Tipo de Perfil</p>
                <p class="font-medium">{{ authStore.user.tipo_perfil || 'Não disponível' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Membro desde</p>
                <p class="font-medium">{{ formattedCreatedAt }}</p>
              </div>
            </div>
          </div>

          <!-- Card de Informações Profissionais -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-primary mb-4 flex items-center">
              <i class="fas fa-briefcase mr-2"></i>
              Informações Profissionais
            </h3>

            <div>
              <div v-if="form.perfil == null">
                <p>Sem informações</p>
              </div>
              <div v-else class="grid md:grid-cols-2 gap-4 w-full">
                <!-- Formulário de cada tipo de perfil com o modo VIEW-MODE-->
                <representante_form
                    v-if="form.tipo_perfil_id == 1"
                    v-model="form.perfil"
                    :view-mode="true"
                />

                <agente_viagem_form
                    v-if="form.tipo_perfil_id == 2"
                    v-model="form.perfil"
                    :view-mode="true"
                />

                <!-- Formulário -->
                <agencia_viagem_form
                    v-if="form.tipo_perfil_id == 3"
                    v-model="form.perfil"
                    :view-mode="true"
                />

                <guia_turismo_form
                    v-if="form.tipo_perfil_id == 4"
                    v-model="form.perfil"
                    :view-mode="true"
                />

                <empresa_form
                    v-if="form.tipo_perfil_id == 5"
                    v-model="form.perfil"
                    :view-mode="true"
                />

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
            v-if="form.perfil == null"
            @click="completeProfile"
            class="px-6 py-2 border rounded-lg font-medium bg-accent text-white transition-colors"
        >
          Completar Perfil
        </button>

        <button
            v-else
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
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth/auth.store';
import ProfileSkeleton from "@/components/user/ProfileSkeleton.vue";
import ProfileAvatarCompact from "@/components/user/ProfileAvatarCompact.vue";
import Agente_viagem_form from "@/components/perfis/forms/agente_viagem_form.vue";
import Representante_form from "@/components/perfis/forms/representante_form.vue";
import TextArea from "@/components/formulario/TextArea.vue";
import Agencia_viagem_form from "@/components/perfis/forms/agencia_viagem_form.vue";
import Guia_turismo_form from "@/components/perfis/forms/guia_turismo_form.vue";
import Empresa_form from "@/components/perfis/forms/empresa_form.vue";

const router = useRouter();
const authStore = useAuthStore();

/// CASO TENHA ALGUMA DIFERENÇA ENTRE OS VALORES, É SÓ FORMATAR PARA CADA TIPO DE PERFIL
const formatedPerfil = function(tipo_perfil_id, perfil) {
  if (perfil == null) return null;

  /// se for representante
  if(tipo_perfil_id === 1){
    return {
      ...perfil,
      endereco: {
        endereco: perfil.endereco,
        cep: perfil.cep,
        estado: perfil.estado,
        pais: perfil.pais,
        cidade: perfil.cidade
      }
    };
  }

  /// se for agência
  if(tipo_perfil_id === 3){
    return {
      ...perfil,
      endereco: {
        endereco: perfil.endereco,
        cep: perfil.cep,
        estado: perfil.estado,
        pais: perfil.pais,
        cidade: perfil.cidade
      }
    };
  }

  /// se for empresa
  if(tipo_perfil_id === 5){
    return {
      ...perfil,

      endereco: {
        endereco: perfil.endereco,
        cep: perfil.cep,
        estado: perfil.estado,
        pais: perfil.pais,
        cidade: perfil.cidade
      },

      /// muitos para muitos
      atividades: perfil.atividades.map((obj) => obj.id),
      produtos_servicos: perfil.produtos_servicos.map((obj) => obj.id),
      unidades_localidades: perfil.unidades_localidades.map((obj) => obj.id),
    };
  }

  /// aqui os outros perfis se for customizado

  /// caso contrário, retorna o perfil original
  return perfil;
}

const form = ref({
  bio: authStore.user.bio ?? '',
  tipo_perfil_id: authStore.user.tipo_perfil_id,
  perfil: formatedPerfil(authStore.user.tipo_perfil_id, authStore.user?.perfil),
});

// Dados padrão para estatísticas
const stats = {
  connections: 0,
  rating: 0,
  projects: 0,
  years: 0
};

const userRole = computed(() => {
  // Você pode adicionar lógica para determinar o role se necessário
  return 'Usuário';
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
  router.push({ name: 'change-password' });
};

const completeProfile = () => {
  router.push({ name: 'completar' });
};

const logout = () => {
  authStore.logout();
};

const isRefreshing = ref(false);

const refreshProfile = async () => {
  isRefreshing.value = true;
  try {
    await authStore.refreshUser();

    // Atualiza o formulário com os novos dados
    form.value = {
      bio: authStore.user.bio,
      tipo_perfil_id: authStore.user.tipo_perfil_id,
      perfil: formatedPerfil(authStore.user.tipo_perfil_id, authStore.user?.perfil),
    };

  } catch (error) {
    console.error('Erro ao recarregar perfil:', error);
  } finally {
    isRefreshing.value = false;
  }
}
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