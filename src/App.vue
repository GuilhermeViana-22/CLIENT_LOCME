<script setup>
// src/App.vue
import { useAuthStore } from '@/stores/auth/auth.store'
import {onMounted} from "vue";

const authStore = useAuthStore()
onMounted(async () => {
  await authStore.initializeAuth()
})
</script>

<template>
  <router-view />
</template>
