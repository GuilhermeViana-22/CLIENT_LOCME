<!-- layouts/MainLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader
        :user="authStore.user"
        @toggle-sidebar="toggleSidebar"
        @logout="handleLogout"
    />

    <main class="flex-1 pt-20 md:pt-16">
      <router-view />
    </main>

    <AppFooter />

    <AppSidebar
        :open="sidebarOpen"
        :user="authStore.user"
        @close="sidebarOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth/auth.store'
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";

const authStore = useAuthStore()
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>

<style scoped>
/* Garante que o layout ocupe pelo menos a altura da tela */
.min-h-screen {
  min-height: 100vh;
}
</style>