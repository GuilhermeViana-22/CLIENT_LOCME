<template>
  <div class="dashboard-mobile">
    <!-- Conteúdo principal -->
    <div class="container mx-auto p-4 space-y-4 pb-16">
      <!-- Barra de busca e filtro -->
      <div class="flex space-x-2">
        <div class="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar usuários..."
            v-model="searchQuery"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-primary focus:border-primary"
          >
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <button 
          @click="toggleFilters"
          class="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full"
        >
          <i class="fas fa-sliders-h"></i>
        </button>
      </div>

      <!-- Filtros (opcional) -->
      <div v-if="showFilters" class="bg-white p-3 rounded-lg shadow-md">
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
            <select class="w-full border border-gray-300 rounded-md p-2 text-sm">
              <option>Todos</option>
              <option>Administradores</option>
              <option>Guias</option>
              <option>Clientes</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select class="w-full border border-gray-300 rounded-md p-2 text-sm">
              <option>Todos</option>
              <option>Ativos</option>
              <option>Inativos</option>
              <option>Pendentes</option>
            </select>
          </div>
          <button 
            @click="applyFilters"
            class="w-full bg-primary text-white py-2 rounded-md text-sm font-medium"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      <!-- Lista de Usuários -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="divide-y divide-gray-200">
          <!-- Cabeçalho da lista -->
          <div class="grid grid-cols-12 bg-gray-50 p-3 text-xs font-medium text-gray-500">
            <div class="col-span-5">Nome</div>
            <div class="col-span-4">Tipo</div>
            <div class="col-span-3 text-right">Ações</div>
          </div>

          <!-- Item de usuário -->
          <div 
            v-for="user in filteredUsers"
            :key="user.id"
            class="grid grid-cols-12 p-3 items-center hover:bg-gray-50"
          >
            <div class="col-span-5 flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm">
                {{ user.name.charAt(0) }}
              </div>
              <span class="truncate">{{ user.name }}</span>
            </div>
            <div class="col-span-4 text-sm">
              <span 
                class="px-2 py-1 rounded-full text-xs"
                :class="{
                  'bg-purple-100 text-primary': user.type === 'Admin',
                  'bg-orange-100 text-accent': user.type === 'Guia',
                  'bg-gray-100 text-gray-600': user.type === 'Cliente'
                }"
              >
                {{ user.type }}
              </span>
            </div>
            <div class="col-span-3 flex justify-end space-x-1">
              <button 
                @click="editUser(user)"
                class="w-8 h-8 flex items-center justify-center text-primary hover:bg-purple-50 rounded-full"
              >
                <i class="fas fa-edit text-sm"></i>
              </button>
              <button 
                @click="toggleUserStatus(user)"
                class="w-8 h-8 flex items-center justify-center rounded-full"
                :class="user.active ? 'text-secondary hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
              >
                <i 
                  class="fas text-sm"
                  :class="user.active ? 'fa-user-slash' : 'fa-user-check'"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="flex justify-between items-center text-sm">
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded-md"
          :class="currentPage === 1 ? 'text-gray-400 border-gray-300' : 'text-primary border-primary'"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded-md"
          :class="currentPage === totalPages ? 'text-gray-400 border-gray-300' : 'text-primary border-primary'"
        >
          Próxima
        </button>
      </div>

      <!-- Botão de adicionar -->
      <router-link 
        to="/users/new"
        class="fixed bottom-20 right-4 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <i class="fas fa-plus text-xl"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dados mockados - substitua pela sua API real
const users = ref([
  { id: 1, name: 'Ana Silva', email: 'ana@example.com', type: 'Admin', active: true },
  { id: 2, name: 'Carlos Mendes', email: 'carlos@example.com', type: 'Guia', active: true },
  { id: 3, name: 'Mariana Costa', email: 'mariana@example.com', type: 'Cliente', active: false },
  { id: 4, name: 'João Pereira', email: 'joao@example.com', type: 'Guia', active: true },
  { id: 5, name: 'Fernanda Lima', email: 'fernanda@example.com', type: 'Cliente', active: true },
  { id: 6, name: 'Ricardo Alves', email: 'ricardo@example.com', type: 'Admin', active: false },
]);

const searchQuery = ref('');
const showFilters = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;

// Computed properties
const filteredUsers = computed(() => {
  let result = users.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }
  
  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage);
});

// Métodos
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const applyFilters = () => {
  showFilters.value = false;
  currentPage.value = 1;
};

const editUser = (user) => {
  console.log('Editar usuário:', user);
  // Navegar para tela de edição
};

const toggleUserStatus = (user) => {
  user.active = !user.active;
  console.log(`Usuário ${user.active ? 'ativado' : 'desativado'}:`, user);
  // Chamada API para atualizar status
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.dashboard-mobile {
  font-family: 'Poppins', sans-serif;
}
</style>