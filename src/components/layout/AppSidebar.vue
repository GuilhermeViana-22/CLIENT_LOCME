<!-- src/components/layout/AppSidebar.vue -->
<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
        v-if="open"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="$emit('close')"
    ></div>
  </transition>

  <!-- Sidebar -->
  <aside
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
      :class="{'translate-x-0': open, '-translate-x-full': !open}"
  >
    <div class="p-4 h-full flex flex-col">
      <!-- Cabeçalho do Sidebar -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-bold text-primary">Menu</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Menu de Navegação -->
      <nav class="flex-1 overflow-y-auto">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.name">
            <router-link
                v-if="item.routeName"
                :to="{ name: item.routeName }"
                class="flex items-center p-3 text-gray-700 hover:bg-purple-50 rounded transition-colors"
                active-class="bg-purple-50 text-primary font-medium"
                @click="$emit('close')"
            >
              <i :class="`fas fa-${item.icon} mr-3 text-gray-500`"></i>
              <span>{{ item.name }}</span>
            </router-link>
            <span
                v-else
                class="flex items-center p-3 text-gray-400 cursor-not-allowed"
            >
              <i :class="`fas fa-${item.icon} mr-3`"></i>
              <span>{{ item.name }}</span>
            </span>
          </li>
        </ul>
      </nav>

      <!-- Rodapé do Sidebar -->
      <div class="pt-4 border-t border-gray-200">
        <div class="flex items-center p-2 text-gray-600">
          <UserAvatar :user="user" size="sm" class="mr-3" />
          <div>
            <p class="font-medium text-sm">{{ user?.name || 'Usuário' }}</p>
            <p class="text-xs text-gray-500">{{ user?.email || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserAvatar from '../user/UserAvatar.vue'

defineProps({
  open: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const menuItems = ref([
  { name: 'Início', icon: 'home', routeName: 'dashboard' },
  { name: 'Perfil', icon: 'user', routeName: 'profile' },
  { name: 'Usuários', icon: 'users', routeName: 'usuarios' },
  { name: 'Configurações', icon: 'cog', routeName: 'settings' },
  { name: 'Ajuda', icon: 'question-circle', routeName: '' }
])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>