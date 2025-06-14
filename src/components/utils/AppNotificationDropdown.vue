<!-- src/components/layout/AppNotificationDropdown.vue -->
<template>
  <div class="relative group">
    <button class="relative p-1 rounded-full hover:bg-primary-light transition-colors">
      <i class="fas fa-bell text-xl text-white"></i>
      <span
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white"
      >
        {{ unreadCount }}
      </span>
    </button>

    <div class="dropdown-menu dropdown-menu absolute right-0 mt-2 md:w-72 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-in-out">
      <div class="px-4 py-2 border-b border-gray-100 font-medium flex justify-between items-center">
        <span>Notificações</span>
        <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-xs text-primary hover:underline"
        >
          Marcar todas como lidas
        </button>
      </div>

      <div v-if="notifications.length > 0" class="max-h-60 overflow-y-auto">
        <a
            v-for="notification in notifications"
            :key="notification.id"
            href="#"
            class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            :class="{'bg-blue-50': !notification.read}"
            @click.prevent="handleNotificationClick(notification)"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-1">
              <i
                  :class="`fas fa-${notification.icon} text-${notification.type}`"
                  class="text-lg"
              ></i>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
              <p class="text-xs text-gray-500">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatTime(notification.time) }}</p>
            </div>
          </div>
        </a>
      </div>
      <div v-else class="px-4 py-6 text-center text-gray-500 text-sm">
        Nenhuma notificação
      </div>

      <div class="px-4 py-2 border-t border-gray-100 text-center">
        <a href="#" class="text-sm text-primary hover:underline">Ver todas</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

interface Notification {
  id: string
  title: string
  message: string
  icon: string
  type: string
  time: Date
  read: boolean
  route?: string
}

const notifications = ref<Notification[]>([
  {
    id: '1',
    title: 'Nova mensagem',
    message: 'Você recebeu uma nova mensagem de Ana',
    icon: 'envelope',
    type: 'primary',
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    read: false,
    route: '/messages/1'
  },
  {
    id: '2',
    title: 'Atualização do sistema',
    message: 'Nova versão 2.0 disponível',
    icon: 'sync',
    type: 'info',
    time: new Date(Date.now() - 1000 * 60 * 60), // 1 hora atrás
    read: true,
    route: '/updates'
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 1000 * 60) return 'Agora mesmo'
  if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))} min atrás`
  if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))} h atrás`

  return date.toLocaleDateString('pt-BR')
}

const markAllAsRead = () => {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

const handleNotificationClick = (notification: Notification) => {
  // Marca como lida
  notifications.value = notifications.value.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
  )

  // Navega se tiver rota definida
  if (notification.route) {
    router.push(notification.route)
  }
}
</script>

<style scoped>

</style>