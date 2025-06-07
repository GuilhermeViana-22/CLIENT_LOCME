<template>
  <div class="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 login-gradient">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center shadow-lg">
          <i class="fas fa-user-lock text-white text-3xl"></i>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white text-display">
        LocMe
      </h2>
      <p class="mt-2 text-center text-sm text-white text-opacity-80">
        Acesse sua conta para continuar
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <!-- Formulário de Login -->
        <form class="space-y-6" @submit.prevent="handleLogin">
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
                placeholder="seu@email.com"
              />
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
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Lembrar de mim e Esqueci a senha -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>

            <router-link :to="{ name: 'forgot' }"
              class="font-medium text-primary hover:text-primary-dark text-sm"
            >
              Esqueci minha senha
            </router-link>
          </div>

          <!-- Botão de Login -->
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    :disabled="authStore.isLoading">
              <span v-if="!authStore.isLoading">Sign in</span>
              <span v-else>Processing...</span>
            </button>

          </div>
        </form>

        <!-- Cadastro -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Novo no LocMe?
              </span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
              to="/auth/register"
              class="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Criar uma conta
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await authStore.login(form.value)
  } catch (error) {
    console.error('Erro no login:', error)
    // Verifique se o erro vem do backend
    if (error.response?.data?.errors) {
      authStore.errors.value = error.response.data.errors
    }
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