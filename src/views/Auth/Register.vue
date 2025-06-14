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

        <!-- Formulário de Login -->
        <form class="space-y-6" @submit.prevent="handleRegister">

          <!-- Nome -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  :class="{'border-red-400': authStore.errors.name, 'border-gray-300': !authStore.errors.name}"
                  placeholder="Seu nome"
              />
            </div>
            <div v-if="authStore.errors.name" class="text-red-600 text-sm mt-1.5">
              {{ authStore.errors.name[0] }}
            </div>
          </div>

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

          <!-- CPF -->
<!--          <div>-->
<!--            <label for="cpf" class="block text-sm font-medium text-gray-700">-->
<!--              CPF-->
<!--            </label>-->
<!--            <div class="mt-1 relative rounded-md shadow-sm">-->
<!--              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">-->
<!--                <i class="fas fa-passport text-gray-400"></i>-->
<!--              </div>-->
<!--              <CpfInput-->
<!--                  v-model="form.cpf"-->
<!--                  :mask="['###.###.###-##']"-->
<!--                  id="user-cpf"-->
<!--                  name="user_cpf"-->
<!--                  :required="true"-->
<!--                  placeholder="Digite CPF"-->
<!--                  :input-class="[-->
<!--                  'py-2 pl-10 block w-full border rounded-md focus:ring-primary focus:border-primary',-->
<!--                  authStore.errors.cpf ? 'border-red-400' : 'border-gray-300'-->
<!--                  ]"-->
<!--                  />-->
<!--            </div>-->
<!--            <div v-if="authStore.errors.cpf" class="text-red-600 text-sm mt-1.5">-->
<!--              {{ authStore.errors.cpf[0] }}-->
<!--            </div>-->
<!--          </div>-->

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                :class="{'border-red-400': authStore.errors.email, 'border-gray-300': !authStore.errors.email}"
                placeholder="seu@email.com"
              />
            </div>
            <div v-if="authStore.errors.email" class="text-red-600 text-sm mt-1.5">
              {{ authStore.errors.email[0] }}
            </div>
          </div>

          <!-- Senha -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                :class="{'border-red-400': authStore.errors.password, 'border-gray-300': !authStore.errors.password}"
                placeholder="••••••••"
              />
            </div>
            <div v-if="authStore.errors.password" class="text-red-600 text-sm mt-1.5">
              {{ authStore.errors.password[0] }}
            </div>
          </div>

          <!-- Senha -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              Confirme sua Senha
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autocomplete="password_confirmation"
                  required
                  class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  :class="{'border-red-400': authStore.errors.password_confirmation, 'border-gray-300': !authStore.errors.password_confirmation}"
                  placeholder="••••••••"
              />
            </div>
            <div v-if="authStore.errors.password_confirmation" class="text-red-600 text-sm mt-1.5">
              {{ authStore.errors.password_confirmation[0] }}
            </div>
          </div>

          <!-- Lembrar de mim e Esqueci a senha -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">

              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Ao criar sua conta você afirma estar ciente e concordar com os <a href="#" class="bg-primary text-white ">Termos de Uso e Política de Privacidade</a>
              </label>
            </div>
          </div>

          <!-- Botão de Login -->
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
import {onMounted, ref} from 'vue';
import { useAuthStore } from '@/stores/auth/auth.store'
import { usePerfilStore } from '@/stores/perfil/perfil.store'

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

// Carrega os tipos de perfil quando o componente é montado
onMounted(async () => {
  await perfilStore.fetchTiposPerfil()
})

const handleRegister = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    authStore.errors = { password: ['As senhas não coincidem'] }
    return
  }

  try {
    await authStore.register(form.value)
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