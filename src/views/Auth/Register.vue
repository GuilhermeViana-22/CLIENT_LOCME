<template>
  <div class="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 login-gradient">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full border border-white bg-opacity-20 flex items-center justify-center shadow-lg">
          <i class="fas fa-user-lock text-white text-3xl"></i>
        </div>
      </div>

      <h2 class="mt-6 text-center text-3xl font-extrabold text-white text-display">
        LocMe
      </h2>
      <p class="mt-2 text-center text-sm text-white text-opacity-80">
        Crie sua conta para continuar
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <!-- Assistente Inteligente para Agente de Viagem -->
        <TravelAgentRegistrationHelper
          v-if="showTravelAgentHelper"
          :form-data="form"
          :profile-type="selectedProfileType"
          @close="showTravelAgentHelper = false"
          @analysis-updated="onAnalysisUpdated"
        />

        <!-- Formulário de Login -->
        <form class="space-y-6" @submit.prevent="handleRegister">

          <!-- Nome -->
          <TextInput
              id="name"
              label="Usuário"
              v-model="form.name"
              name="name"
              icon="fas fa-user text-gray-400"
              placeholder="Seu nome de usuário"
              :error="authStore.errors.name"
              :error-message="authStore.errors.name?.[0]"
              required
          />

          <!-- tipo de perfil -->
          <div>
            <label for="tipo_perfil" class="block text-sm font-medium text-gray-700">
              Tipo de Perfil
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user-tag text-gray-400"></i>
              </div>
              <select
                  id="tipo_perfil"
                  v-model="form.tipo_perfil_id"
                  name="tipo_perfil"
                  required
                  class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  :class="{'border-red-400': authStore.errors.tipo_perfil_id, 'border-gray-300': !authStore.errors.tipo_perfil_id}"
                  :disabled="perfilStore.isLoading"
              >
                <option value="" disabled selected>Selecione seu tipo de perfil</option>
                <option
                    v-for="tipo in perfilStore.tiposPerfil"
                    :key="tipo.id"
                    :value="tipo.id"
                >
                  {{ tipo.tipo }}
                </option>
              </select>
            </div>
            <div v-if="authStore.errors.tipo_perfil_id" class="text-red-600 text-sm mt-1.5">
              {{ authStore.errors.tipo_perfil_id[0] }}
            </div>
            <div v-if="perfilStore.error" class="text-red-600 text-sm mt-1.5">
              {{ perfilStore.error }}
            </div>
          </div>

          <!-- Email -->
          <TextInput
              id="email"
              label="E-mail"
              v-model="form.email"
              name="email"
              type="email"
              icon="fas fa-envelope text-gray-400"
              placeholder="seu@email.com"
              :error="authStore.errors.email"
              :error-message="authStore.errors.email?.[0]"
              required
              autocomplete="email"
          />

          <!-- Senha -->
          <TextInput
              id="password"
              label="Senha"
              v-model="form.password"
              name="password"
              type="password"
              icon="fas fa-lock text-gray-400"
              placeholder="••••••••"
              :error="authStore.errors.password"
              :error-message="authStore.errors.password?.[0]"
              required
              autocomplete="new-password"
          />

          <!-- Confirmação de Senha -->
          <TextInput
              id="password_confirmation"
              label="Confirme sua Senha"
              v-model="form.password_confirmation"
              name="password_confirmation"
              type="password"
              icon="fas fa-lock text-gray-400"
              placeholder="••••••••"
              :error="authStore.errors.password_confirmation"
              :error-message="authStore.errors.password_confirmation?.[0]"
              required
              autocomplete="new-password"
          />

          <!-- Termos de Uso -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Ao criar sua conta você afirma estar ciente e concordar com os <a href="#" class="bg-primary text-white">Termos de Uso e Política de Privacidade</a>
              </label>
            </div>
          </div>

          <!-- Botão de Registro -->
          <div>
            <button type="submit"
                    :disabled="authStore.isLoading"
                    class="w-full cursor-pointer py-3.5 px-4 bg-primary text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md mt-2">
              <span v-if="!authStore.isLoading">Criar Conta</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            </button>
          </div>
        </form>

        <!-- Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Já tem conta no LocMe?
              </span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
                to="/auth/login"
                class="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Logar
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth/auth.store'
import { usePerfilStore } from '@/stores/perfil/perfil.store'
import TextInput from "@/components/formulario/TextInput.vue";
import TravelAgentRegistrationHelper from "@/components/utils/TravelAgentRegistrationHelper.vue";

const authStore = useAuthStore()
const perfilStore = usePerfilStore()

const form = ref({
  name: '',
  cpf: '',
  email: '',
  password: '',
  password_confirmation: '',
  tipo_perfil_id: ''
})

// Estado do assistente inteligente
const showTravelAgentHelper = ref(false)
const analysisData = ref(null)

// Computed para o tipo de perfil selecionado
const selectedProfileType = computed(() => {
  if (!form.value.tipo_perfil_id || !perfilStore.tiposPerfil.length) {
    return null
  }
  
  const selectedProfile = perfilStore.tiposPerfil.find(
    profile => profile.id === form.value.tipo_perfil_id
  )
  
  return selectedProfile?.tipo?.toLowerCase().replace(/\s+/g, '_') || null
})

// Watch para mostrar o assistente quando agente de viagem for selecionado
watch(() => form.value.tipo_perfil_id, (newValue, oldValue) => {
  if (newValue && perfilStore.tiposPerfil.length > 0) {
    const selectedProfile = perfilStore.tiposPerfil.find(
      profile => profile.id === newValue
    )
    
    if (selectedProfile && selectedProfile.tipo.toLowerCase().includes('agente')) {
      showTravelAgentHelper.value = true
    } else {
      showTravelAgentHelper.value = false
    }
  }
})

// Carrega os tipos de perfil quando o componente é montado
onMounted(async () => {
  await perfilStore.fetchTiposPerfil()
})

// Callback para quando a análise for atualizada
const onAnalysisUpdated = (analysis) => {
  analysisData.value = analysis
}

const handleRegister = async () => {
  // Validação básica de senha
  if (form.value.password !== form.value.password_confirmation) {
    authStore.errors = { password: ['As senhas não coincidem'] }
    return
  }

  // Se for agente de viagem e temos análise, considerar as validações do assistente
  if (selectedProfileType.value === 'agente_de_viagem' && analysisData.value) {
    if (analysisData.value.validation && analysisData.value.validation.length > 0) {
      // Converter validações do assistente para o formato esperado pelo authStore
      const errors = {}
      analysisData.value.validation.forEach(error => {
        errors[error.field] = [error.message]
      })
      authStore.errors = errors
      
      // Mostrar o assistente se não estiver visível
      if (!showTravelAgentHelper.value) {
        showTravelAgentHelper.value = true
      }
      
      return
    }
  }

  try {
    await authStore.register(form.value)
    
    // Se o registro foi bem-sucedido e for agente de viagem, mostrar mensagem de sucesso
    if (selectedProfileType.value === 'agente_de_viagem') {
      console.log('✈️ Registro de agente de viagem realizado com sucesso!')
    }
  } catch (error) {
    console.error('Erro no registro:', error)
  }
}
</script>

<style scoped>
.login-gradient {
  background: linear-gradient(135deg, rgba(65, 1, 121, 0.95) 0%, rgba(255, 49, 49, 0.85) 100%);
}

.text-display {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.025em;
}

.bg-primary-dark {
  background-color: #30015e;
}
</style>