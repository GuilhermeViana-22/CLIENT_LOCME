<template>
  <div class="settings-container">
    <!-- Conteúdo principal -->
    <div class="container mx-auto p-6 pb-8">
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Coluna 1: Perfil e Configurações Rápidas -->
        <div class="space-y-6">
          <!-- Card de Perfil -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 flex flex-col items-center text-center border-b">
              <div class="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl mb-3">
                {{ userInitials }}
              </div>
              <h3 class="font-bold text-lg">{{ currentUser.name }}</h3>
              <p class="text-sm text-gray-500">{{ currentUser.email }}</p>
              <router-link
                  :to="{ name: 'profile' }"
                  class="mt-4 inline-block px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors"
              >
                Ver perfil completo
              </router-link>
            </div>
          </div>

          <!-- Card de Ações Rápidas -->
          <div class="bg-white rounded-xl shadow-md">
            <h3 class="p-4 text-lg font-semibold border-b">Ações Rápidas</h3>
            <div class="p-2">
              <button
                  @click="checkUpdates"
                  class="w-full p-3 text-left flex items-center hover:bg-gray-50 rounded-lg transition-colors"
              >
                <i class="fas fa-sync-alt text-gray-500 mr-3 w-5 text-center"></i>
                <span>Buscar Atualizações</span>
              </button>
              <button
                  @click="showHelp"
                  class="w-full p-3 text-left flex items-center hover:bg-gray-50 rounded-lg transition-colors"
              >
                <i class="fas fa-question-circle text-gray-500 mr-3 w-5 text-center"></i>
                <span>Ajuda & Suporte</span>
              </button>
              <button
                  @click="logout"
                  class="w-full p-3 text-left flex items-center hover:bg-gray-50 rounded-lg text-secondary transition-colors"
              >
                <i class="fas fa-sign-out-alt mr-3 w-5 text-center"></i>
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Coluna 2: Preferências -->
        <div>
          <div class="bg-white rounded-xl shadow-md">
            <h3 class="p-6 text-xl font-semibold border-b">Preferências</h3>
            <div class="p-4 space-y-4">
              <div class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div class="flex items-center">
                  <i class="fas fa-moon text-gray-500 mr-4 w-5 text-center"></i>
                  <span>Modo Escuro</span>
                </div>
                <button
                    @click="toggleDarkMode"
                    class="w-14 h-7 flex items-center rounded-full p-1 transition-colors"
                    :class="darkMode ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'"
                >
                  <div class="w-5 h-5 rounded-full bg-white shadow"></div>
                </button>
              </div>

              <router-link
                  to="/settings/notifications"
                  class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div class="flex items-center">
                  <i class="fas fa-bell text-gray-500 mr-4 w-5 text-center"></i>
                  <span>Notificações</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
              </router-link>

              <router-link
                  to="/settings/language"
                  class="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div class="flex items-center">
                  <i class="fas fa-language text-gray-500 mr-4 w-5 text-center"></i>
                  <span>Idioma</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-500 mr-2">Português</span>
                  <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Coluna 3: Informações Técnicas -->
        <div>
          <div class="bg-white rounded-xl shadow-md h-full">
            <h3 class="p-6 text-xl font-semibold border-b">Sobre o Sistema</h3>
            <div class="p-6 space-y-6">
              <div>
                <h4 class="font-medium mb-3 text-primary">Tecnologias Utilizadas</h4>
                <div class="space-y-3">
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

              <div class="pt-4 border-t pb-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-500">Versão</span>
                  <span class="font-medium">2.3.1</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-gray-500">Última Atualização</span>
                  <span class="font-medium">06/06/2025</span>
                </div>
              </div>
              <div class="pt-4 border-t pb-4">
                <h4 class="font-medium mb-3 text-primary">Desenvolvedores</h4>
                <div class="flex justify-between  items-center mt-2">
                  <span class="text-gray-500">Guilherme Viana</span>
                  <span class="font-medium">Github</span>
                </div>
                <div class="flex justify-between  items-center mt-2">
                  <span class="text-gray-500">Robert Uillians</span>
                  <span class="font-medium">Github</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dados do usuário (dados mockados temporariamente)
const currentUser = ref({
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
};

const showHelp = () => {
  router.push('/help');
};

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
.settings-container {
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

/* Transições suaves */
button, a, .transition-colors {
  transition: all 0.2s ease;
}

/* Melhoria na legibilidade */
p, span {
  line-height: 1.5;
}
</style>