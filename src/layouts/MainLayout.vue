<!-- src/layouts/MainLayout.vue -->
<template>
  <!-- Top Bar -->
  <div class="md:hidden bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <i class="fas fa-bars text-xl" @click="toggleSidebar"></i>
      </div>
      <h1 class="text-xl font-bold">LocME</h1>
      <div class="flex items-center space-x-4">
        <i class="fas fa-bell text-xl"></i>
        <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <i class="fas fa-user text-white"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- Top Bar Desktop -->
  <div class="hidden md:flex bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-40 h-16 flex items-center">
    <section class="container mx-auto">
      <div class="flex justify-between items-center w-full px-6">
        <!-- Logo e Nome do Sistema -->
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">LocME</h1>
          <!-- Links de Navegação -->
          <nav class="hidden lg:flex items-center space-x-6 ml-8">
            <router-link
                v-for="item in menuItemsD.filter(i => i.routeName)"
                :key="item.name"
                :to="{ name: item.routeName }"
                class="hover:text-accent transition-colors"
                active-class="text-accent font-medium"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <div class=" w-full px-20 m-4 mx-auto">
          <SearchCard />
        </div>

        <!-- Ícones do Lado Direito -->
        <div class="flex items-center space-x-6">
          <!-- Tradutor -->
          <div class="relative group">
            <i class="fas fa-language text-xl cursor-pointer hover:text-accent"></i>
            <div class="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Português</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">English</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Español</a>
            </div>
          </div>

          <!-- Notificações -->
          <div class="relative group">
            <i class="fas fa-bell text-xl cursor-pointer hover:text-accent"></i>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            <div class="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
              <div class="px-4 py-2 border-b border-gray-100 font-medium">Notificações</div>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Nova mensagem recebida</a>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Atualização do sistema</a>
              <div class="px-4 py-2 border-t border-gray-100 text-center">
                <a href="#" class="text-sm text-primary hover:underline">Ver todas</a>
              </div>
            </div>
          </div>

          <!-- Perfil do Usuário -->
          <div class="relative group">
            <div class="flex items-center space-x-2 cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <i class="fas fa-user text-white"></i>
              </div>
              <span class="text-sm hidden md:inline-block">Usuário</span>
              <i class="fas fa-chevron-down text-xs hidden md:inline-block"></i>
            </div>
            <div class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
              <router-link
                  to="profile"
                  class="text-sm hover:text-accent transition-colors duration-200 block px-4 py-2 hover:bg-gray-100"
                  active-class="text-accent"
              >
                <p>Meu Perfil</p>
              </router-link>

              <router-link
                  to="settings"
                  class="text-sm hover:text-accent transition-colors duration-200 block px-4 py-2 hover:bg-gray-100"
                  active-class="text-accent"
              >
                <p>Configurações</p>
              </router-link>

              <router-link
                  to="auth/login"
                  class="text-sm hover:text-accent transition-colors duration-200 block px-4 py-2 hover:bg-gray-100"
                  active-class="text-accent"
              >
                <p>Sair</p>
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="pt-20">
    <router-view /> <!-- Aqui o conteúdo das rotas será injetado -->
  </div>

  <!-- Footer -->
  <div class="text-center text-sm text-gray-500 mt-8 pt-6 pb-6 border-t">
    <p>LocMe © 2025 - Todos os direitos reservados</p>
  </div>

  <!-- Sidebar -->
  <div
      v-if="sidebarOpen"
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform"
  >
    <div class="p-4">
      <div>
        <div class="flex justify-between space-x-2">
          <h2 class="text-lg font-bold text-primary mb-4">Menu</h2>
          <i class="fas fa-times text-xl" @click="toggleSidebar"></i>
        </div>
      </div>
      <ul class="space-y-2">
        <li
            v-for="item in menuItems"
            :key="item.name"
            class="p-2 hover:bg-purple-50 rounded"
        >
          <router-link
              v-if="item.routeName"
              :to="{ name: item.routeName }"
              class="flex items-center text-gray-700"
          >
            <i :class="`fas fa-${item.icon} mr-2`"></i>
            {{ item.name }}
          </router-link>
          <span
              v-else
              class="flex items-center text-gray-400 cursor-not-allowed"
          >
              <i :class="`fas fa-${item.icon} mr-2`"></i>
              {{ item.name }}
            </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchCard from "@/components/SearchCard.vue";
import {ref} from "vue";

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

/// menu desktop
const menuItemsD = ref([
  { name: 'Início', icon: 'home', routeName: 'dashboard' },
  //{ name: 'Perfil', icon: 'user', routeName: 'profile' },
  { name: 'Usuarios', icon: 'envelope', routeName: 'usuarios' },
  //{ name: 'Configurações', icon: 'cog', routeName: 'settings' },
  { name: 'Ajuda', icon: 'question-circle', routeName: null }
]);

/// menu mobile
const menuItems = ref([
  { name: 'Início', icon: 'home', routeName: 'dashboard' },
  { name: 'Perfil', icon: 'user', routeName: 'profile' },
  { name: 'Usuarios', icon: 'envelope', routeName: 'usuarios' },
  { name: 'Configurações', icon: 'cog', routeName: 'settings' },
  { name: 'Ajuda', icon: 'question-circle', routeName: null }
]);
</script>