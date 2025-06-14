<!-- components/layout/AppHeader.vue -->
<template>
  <!-- Mobile Header -->
  <div class="md:hidden bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="flex justify-between items-center">
      <button @click="$emit('toggle-sidebar')">
        <i class="fas fa-bars text-xl"></i>
      </button>
      <h1 class="text-xl font-bold">LocME</h1>
      <div class="flex items-center space-x-4">
        <AppNotificationDropdown />
        <UserAvatar :user="user" />
      </div>
    </div>
  </div>

  <!-- Desktop Header -->
  <div class="hidden md:flex bg-primary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-40 h-16 items-center">
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">LocME</h1>
          <nav class="hidden lg:flex items-center space-x-6 ml-8">
            <router-link
                v-for="item in menuItems.filter(i => i.routeName)"
                :key="item.name"
                :to="{ name: item.routeName }"
                class="hover:text-accent transition-colors"
                active-class="text-accent font-medium"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <div class="w-full px-20 m-4 mx-auto">
          <SearchCard />
        </div>

        <div class="flex items-center space-x-6">

          <AppNotificationDropdown />
          <UserDropdown :user="user" @logout="$emit('logout')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNotificationDropdown from '../utils/AppNotificationDropdown.vue'
import UserDropdown from '../user/UserDropdown.vue'
import UserAvatar from '../user/UserAvatar.vue'

import SearchCard from '@/components/dashboard/SearchCard.vue'

defineProps({
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['toggle-sidebar', 'logout'])

const menuItems = ref([
  { name: 'Início', routeName: 'dashboard' },
  { name: 'Usuários', routeName: 'usuarios' }
])
</script>