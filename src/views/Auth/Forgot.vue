<template>
  <div class="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 login-gradient">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center shadow-lg">
          <i class="fas fa-key text-white text-3xl"></i>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white text-display">
        Redefinir Senha
      </h2>
      <p class="mt-2 text-center text-sm text-white text-opacity-80">
        Digite seu e-mail para receber o link de redefinição
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
        <!-- Formulário de Recuperação -->
        <form class="space-y-6" @submit.prevent="handleResetRequest">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              E-mail cadastrado
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <!-- Mensagem de feedback -->
          <div v-if="message" class="p-3 rounded-md" :class="{
            'bg-green-50 text-green-800': isSuccess,
            'bg-red-50 text-red-800': !isSuccess
          }">
            <p class="text-sm">{{ message }}</p>
          </div>

          <!-- Botão de Envio -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              <span v-if="!isLoading">Enviar Link</span>
              <span v-else class="flex items-center">
                <i class="fas fa-spinner fa-spin mr-2"></i> Enviando...
              </span>
            </button>
          </div>
        </form>

        <!-- Voltar para Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Lembrou sua senha?
              </span>
            </div>
          </div>

          <div class="mt-6">
            <router-link
              to="/login"
              class="w-full flex justify-center py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Voltar para Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const isLoading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const handleResetRequest = async () => {
  try {
    isLoading.value = true;
    message.value = '';
    
    // Simulação de envio de e-mail - substitua pela sua API real
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    isSuccess.value = true;
    message.value = `Enviamos um link para ${email.value}. Verifique sua caixa de entrada.`;
    
    // Limpar após sucesso
    email.value = '';
    
    // Redirecionar após alguns segundos (opcional)
    setTimeout(() => {
      router.push('/login');
    }, 5000);
  } catch (error) {
    isSuccess.value = false;
    message.value = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
    console.error('Reset password error:', error);
  } finally {
    isLoading.value = false;
  }
};
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