<!-- components/layout/UserDropdown.vue -->
<template>
  <div class="relative group">
    <div class="flex items-center space-x-2 cursor-pointer">
      <UserAvatar :user="user" size="sm" />
      <span class="text-sm hidden md:inline-block">{{ user?.name.split(" ")[0] || 'Usuário' }}</span>
      <i class="fas fa-chevron-down text-xs hidden md:inline-block"></i>
    </div>

    <div class="dropdown-menu absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible translate-y-1  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-in-out">
      <router-link to="profile" class="dropdown-item  block px-4 py-2 text-sm hover:bg-gray-100">
        <i class="fas fa-user mr-2"></i> Meu Perfil
      </router-link>
      <router-link to="settings" class="dropdown-item  block px-4 py-2 text-sm hover:bg-gray-100">
        <i class="fas fa-cog mr-2"></i> Configurações
      </router-link>
      <button class="dropdown-item text-red-500 block px-4 py-2 text-sm hover:bg-gray-100" @click="$emit('logout')">
        <i class="fas fa-sign-out-alt mr-2"></i> Sair
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'

defineProps({
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['logout'])
</script>

<style scoped>

</style>