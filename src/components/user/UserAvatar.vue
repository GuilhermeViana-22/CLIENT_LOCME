<!-- components/layout/UserAvatar.vue -->
<template>
  <div
      class="rounded-full flex items-center justify-center overflow-hidden md:w-16 w-12 h-12"
      :style="avatarStyle"
  >
    <template v-if="user?.foto_perfil_url">
      <img
          :src="user.foto_perfil_url"
          :alt="user.name"
          class="w-full h-full object-cover"
      />
    </template>
    <template v-else>
      <i class="fas fa-user text-white"></i>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  }
})

const avatarStyle = computed(() => ({
  backgroundColor: !props.user?.foto_perfil_url ? '#7C3AED' : 'transparent'
}))
</script>